#!/usr/bin/env node

const meow = require('meow');
const chalk = require('chalk');
const ora = require('ora');
const boxen = require('boxen');
const getNpmDownloads = require('./getNpmDownloads');

const cli = meow(chalk.white(
  `
    Usage
        $ download-stats-cli [repository_name || #user_name] period_option

    Examples
        $ download-stats-cli repository_name today
        $ download-stats-cli repository_name last-day
        $ download-stats-cli repository_name day
        $ download-stats-cli repository_name last-week
        $ download-stats-cli '#user_name' w
        $ download-stats-cli '#user_name' last-month
        $ download-stats-cli '#user_name' 2014-01-01:2014-01-31
        $ download-stats-cli '#user_name' w
        $ download-stats-cli '#user_name' t
`,
  {
    flags: {
      date: {
        type: 'string',
        alias: 'd',
        isRequired: () => false
      },
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
  let userId, repo;
  if (cli.input[0].startsWith('#')) {
    userId = cli.input[0].split('#')[1];
  } else {
    repo = cli.input[0];
  }

  const spinner = ora({
    color: 'green',
    discardStdin: true
  }).start(chalk.whiteBright(`Fetching info.. this could take a few minutes if there lots if repos..`));

  const data = await getNpmDownloads({
    userId,
    repo,
    period: cli.input[1],
  });

  spinner.succeed('Works done!');

  data.sort((a, b) => {
    return a.downloads > b.downloads ? -1 : a.downloads < b.downloads ? 1 : 0;
  });

  console.log(data.map(transform).join('\n'));
})();
