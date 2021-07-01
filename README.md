## download-stats-cli

Display npm download in console (also include lib)

Using worker_threads to boost fetch speed.

![](./demo.png)

### Usage

```js
const getNpmDownloads = require('download-stats-cli');

const datas = getNpmDownloads({
  userId,
  repo,
  period: 'total'
});
```

### Usage-cli

```
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
```
