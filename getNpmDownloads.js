const NpmApi = require('npm-api');
const axios = require('axios');
const { getToday } = require('./utils');
const { Worker } = require('worker_threads');
const path = require('path');

let npm = new NpmApi();

const url = (period, repository) =>
  `https://api.npmjs.org/downloads/point/${period}/${repository}`;

module.exports = async ({ userId, period, repository }) => {
  if (!userId && !repository) {
    throw new Error('userId or repo must be given');
  }

  switch (period) {
  case 'last-day':
  case 'last-week':
  case 'last-month':
    break;

  case 't':
  case 'total':
    // from npm's initial release date to today
    period = `2010-01-12:${getToday()}`;
    break;

  case 'm':
  case 'month':
    period = 'last-month';
    break;
  case 'w':
  case 'week':
    period = 'last-week';
    break;

  case 'd':
  case 'day':
  case 'today':
    period = 'last-day';
    break;
  }

  if (repository) {
    return (await axios.get(url(period, repository))).data;
  }

  const maintainer = npm.maintainer(userId);
  const repos = await maintainer.repos();
  const result = [];
  const workers = new Set();

  for (const repo of repos) {
    const worker = new Worker(path.join(`${__dirname}`, 'downloadWork.js'));
    workers.add(worker);
    worker.postMessage({
      url: url(period, repo)
    });

    worker.on('message', ({ data, errorMsg }) => {
      if (data) {
        result.push(data);
      } else if (errorMsg) {
        throw new Error(errorMsg);
      }
      workers.delete(worker);
    });
  }

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (workers.size === 0) {
      return result;
    }
    // yield Execution Order to other workers
    await sleep(1);
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}