const { isMainThread, parentPort } = require('worker_threads');
const axios = require('axios');

if (!isMainThread) {
  parentPort.on('message', async ({ url }) => {
    try {
      const data = (await axios.get(url)).data;
      parentPort.postMessage({ data });
    } catch (e) {
      // url is wrong or too new package
      if (e.response && e.response.status === 404) {
        parentPort.postMessage({ data: undefined });
      } else {
        console.error(e);
      }
    }
    parentPort.close();
  });
}