## npm-downloads

Displays npm download in json format

### Usage

```js
const getNpmDownloads = require('npm-downloads');
const datas = getNpmDownloads({
  userId,
  repo,
  period: 'total'
});
```

### Usage-cli

```
  Usage
      $ npm-downloads [repository_name || #user_name] period_option

  Examples
      $ npm-downloads repository_name today
      $ npm-downloads repository_name last-day
      $ npm-downloads repository_name day
      $ npm-downloads repository_name last-week
      $ npm-downloads '#user_name' w
      $ npm-downloads '#user_name' last-month
      $ npm-downloads '#user_name' 2014-01-01:2014-01-31
      $ npm-downloads '#user_name' w
      $ npm-downloads '#user_name' t
```
