const NpmApi = require('npm-api');
const axios = require('axios');
const { getToday } = require('./utils');
let npm = new NpmApi();

const url = (period, repository) =>
  `https://api.npmjs.org/downloads/point/${period}/${repository}`;

module.exports = async ({ userId, period, repo: repoToView }) => {
  if (!userId && !repoToView) {
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

  if (repoToView) {
    return (await axios.get(url(period, repoToView))).data;
  }

  const maintainer = npm.maintainer(userId);
  const repos = await maintainer.repos();
  const result = [];

  for await (const repo of repos) {
    if (repoToView && repo !== repoToView) continue;
    const downloadInfos = await axios.get(url(period, repo));
    result.push(downloadInfos.data);
  }

  return result;
};
