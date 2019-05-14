const urllib = require('urllib');
const compressing = require('compressing');
const shell = require('shelljs');
const httpClient = urllib.create();
const registry = 'https://test1-city.pingan.com.cn/static/public/doc/disease_20171213_1020.zip';

function download(url, savePath, directoryName = null) {
  const pkgUrl = registry;
  return new Promise((resolve, reject) => {
    httpClient
      .request(pkgUrl, {
        // streaming: true,
        // followRedirect: true
      })
      .then(fetchResult => {
        console.log(fetchResult);
        return compressing.zip.uncompress(fetchResult.data, './unit/tmp');
      })
      .then(zipResult => {
        resolve(zipResult);
      })
      // .then(fetchPkgDist => {
      //   const res = fetchPkgDist.res;
      //   return compressing.tgz.uncompress(res, savePath);
      // })
      .catch(err => {
        reject(err);
      })
  });
}

download()
  .then(rsp => {
    console.log('resolve:', rsp);
  })
  .catch(err => {
    console.log('reject:', err);
  });
