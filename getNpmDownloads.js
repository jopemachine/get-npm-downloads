const NpmApi = require('npm-api');
const axios = require('axios');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const {getToday} = require('./utils');

const npm = new NpmApi();

const url = (period, repository) =>
	`https://api.npmjs.org/downloads/point/${period}/${repository}`;

const getNpmDownloads = async ({
	userId,
	repository,
	period = 't',
	flags = {force: false, debug: false, name: ''}
}) => {
	if (!userId && !repository) {
		throw new Error(`${logSymbols.error} userId or repo must be given`);
	}

	switch (period) {
		case 'last-day':
		case 'last-week':
		case 'last-month':
			break;

		case 't':
		case 'total':
			// From npm's initial release date to today
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

	const repos = (await maintainer.repos()).filter(repoName =>
		!flags.name || repoName.includes(flags.name)
	);

	const promises = [];

	if (!flags.force && repos.length > 300) {
		throw new Error(
			chalk.whiteBright(
				`${logSymbols.error} Too many repository exist. (count: ${repos.length}). to ignore this error, set force to true.`
			)
		);
	}

	for (const repo of repos) {
		promises.push(axios.get(url(period, repo)));
	}

	const datas = (await Promise.allSettled(promises))
		.filter(item => item.status === 'fulfilled')
		.map(item => item.value.data);

	if (flags.debug) {
		const errors = (await Promise.allSettled(promises)).filter(
			item => item.status === 'rejected'
		);
		console.error('Errors', errors);
	}

	return datas;
};

module.exports = getNpmDownloads;
