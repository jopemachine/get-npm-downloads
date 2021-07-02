const NpmApi = require('npm-api');
const axios = require('axios');
const { getToday } = require('./utils');
const chalk = require('chalk');

let npm = new NpmApi();

const url = (period, repository) =>
  `https://api.npmjs.org/downloads/point/${period}/${repository}`;

module.exports = async ({ userId, period, repository, flags = { force: false } }) => {
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

  const promises = [];

  if (!flags.force && repos.length > 300) {
    throw new Error(chalk.red(`Too many repository exist. (count: ${repos.length}). to ignore this error, set force to true.`));
  }

  for (const repo of repos) {
    promises.push(axios.get(url(period, repo)));
  }

  const datas = (await Promise.allSettled(promises)).filter(item => item.status === 'fulfilled').map(item => item.value.data);

  return datas;
};
