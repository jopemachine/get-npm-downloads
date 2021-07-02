# get-npm-downloads [![BuildStatus](https://api.travis-ci.com/jopemachine/get-npm-downloads.svg)](https://www.npmjs.com/package/get-npm-downloads)

Display npm download in console (also include lib)

## 429 Error

This lib iterate and send request to all repository of 'userId'.

So, too many request cause errors.

And I made a limit to this (200).

Set `force` option to true if you would like to ignore this limit


![](./demo.png)

## Usage

```js
const getNpmDownloads = require('get-npm-downloads');

const datas = getNpmDownloads({
  userId,
  repo,
  period: 'total'
});
```

## Usage-cli

```
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
```
