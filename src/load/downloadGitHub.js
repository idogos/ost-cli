const download = require('download-git-repo');
const shell = require('shelljs');
const open = require('open');
const STATIC_URL = 'https://www.baidu.com/';

function downloadGitHub(url, savePath, useStatic) {
  const finalPath = `${savePath}`;
  shell.rm('-rf', finalPath);
  return new Promise((resolve, reject) => {
    useStatic ? open(STATIC_URL)
      .then(openStatus => {
        resolve('Download by open browser');
      })
      .catch(err => {
        reject({
          __MSG__: __ERROR_STATUS__['open-browser-fail'],
          err
        });
      }) :
    download(url, finalPath, null, function(err) {
      if(err) {
        reject({
          __MSG__: __ERROR_STATUS__['download-github-fail'],
          err
        });
      }
      resolve(finalPath);
    })
  });
}

module.exports = downloadGitHub;
