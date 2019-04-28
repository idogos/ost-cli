const download = require('download-git-repo');
const shell = require('shelljs');

function downloadGitHub(url, savePath) {
  console.log();
  console.log(savePath);
  console.log();
  const finalPath = `${savePath}`;
  shell.rm('-rf', finalPath);
  return new Promise((resolve, reject) => {
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
