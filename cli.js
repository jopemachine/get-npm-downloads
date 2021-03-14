#!/usr/bin/env node

const meow = require('meow');
const getNpmDownloads = require('./getNpmDownloads');

const cli = meow(
  `
    Usage
        $ npm-download-counter [repository_name || #user_name] period_option

    Examples
        $ npm-download-counter repository_name today
        $ npm-download-counter repository_name last-day
        $ npm-download-counter repository_name day
        $ npm-download-counter repository_name last-week
        $ npm-download-counter '#user_name' w
        $ npm-download-counter '#user_name' last-month
        $ npm-download-counter '#user_name' 2014-01-01:2014-01-31
        $ npm-download-counter '#user_name' w
        $ npm-download-counter '#user_name' t
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
);

(async function () {
  let userId, repo;
  if (cli.input[0].startsWith('#')) {
    userId = cli.input[0].split('#')[1];
  } else {
    repo = cli.input[0];
  }

  const data = await getNpmDownloads({
    userId,
    repo,
    period: cli.input[1],
  });

  console.log(data);
}) ();
