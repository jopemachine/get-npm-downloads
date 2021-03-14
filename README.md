## npm-download-counter

Displays npm download in json format

### Usage

```js
const getNpmDownloads = require('npm-download-counter');
const datas = getNpmDownloads({
  userId,
  repo,
  period: 'total'
});
```

### Usage-cli

```
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
```
