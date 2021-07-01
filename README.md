## get-npm-download

Display npm download in console (also include lib)

Using worker_threads to boost fetch speed.

![](./demo.png)

### Usage

```js
const getNpmDownloads = require('get-npm-download');

const datas = getNpmDownloads({
  userId,
  repo,
  period: 'total'
});
```

### Usage-cli

```
  Usage
      $ get-npm-download [repository_name || #user_name] period_option

  Examples
      $ get-npm-download repository_name today
      $ get-npm-download repository_name last-day
      $ get-npm-download repository_name day
      $ get-npm-download repository_name last-week
      $ get-npm-download '#user_name' w
      $ get-npm-download '#user_name' last-month
      $ get-npm-download '#user_name' 2014-01-01:2014-01-31
      $ get-npm-download '#user_name' w
      $ get-npm-download '#user_name' t
```
