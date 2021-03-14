const { isMainThread, parentPort } = require('worker_threads');
const axios = require('axios');

if (!isMainThread) {
  parentPort.on('message', async ({ url }) => {
    parentPort.postMessage({
      data: (await axios.get(url)).data
    });
    parentPort.close();
  });
}