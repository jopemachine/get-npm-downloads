#!/usr/bin/env node

const meow = require('meow');
const chalk = require('chalk');
const ora = require('ora');
const boxen = require('boxen');
const getNpmDownloads = require('./getNpmDownloads');

const cli = meow(chalk.white(
  `
    Usage
        $ get-npm-downloads [repository_name || #user_name] period_option

    Examples
        $ get-npm-downloads repository_name today
        $ get-npm-downloads repository_name last-day
        $ get-npm-downloads repository_name day
        $ get-npm-downloads repository_name last-week
        $ get-npm-downloads '#user_name' w
        $ get-npm-downloads '#user_name' last-month
        $ get-npm-downloads '#user_name' 2014-01-01:2014-01-31
        $ get-npm-downloads '#user_name' w
        $ get-npm-downloads '#user_name' t
`,
  {
    flags: {
      date: {
        type: 'string',
        alias: 'd',
        isRequired: () => false
      },
      force: {
        type: 'boolean',
        alias: 'f',
        isRequired: () => false
      }
    }
  }
));

const transform = (item) => {
  const itemLine = chalk.whiteBright(`${chalk.cyanBright(item.package)}
Period: ${chalk.greenBright(item.start + ' ~ ' + item.end)}
Downloads: ${chalk.magentaBright(item.downloads)}`);

  return chalk.whiteBright(boxen(itemLine, { padding: 1, margin: 1, borderStyle: 'double' }));
};

(async function () {
  let userId, repository;
  if (cli.input[0].startsWith('#')) {
    userId = cli.input[0].split('#')[1];
  } else {
    repository = cli.input[0];
  }

  const spinner = ora({
    color: 'green',
    discardStdin: true
  }).start(chalk.whiteBright(`Fetching info.. This could take a few minutes if there are lots of repositorys..`));

  const data = await getNpmDownloads({
    userId,
    repository,
    period: cli.input[1],
    flags: cli.flags,
  });

  spinner.succeed('Works done!');

  data.sort((a, b) => {
    return a.downloads > b.downloads ? -1 : a.downloads < b.downloads ? 1 : 0;
  });

  console.log(data.map(transform).join('\n'));
})();
