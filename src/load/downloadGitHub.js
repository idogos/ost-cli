const download = require('download-git-repo');

function downloadGitHub(url, savePath) {
  const finalPath = `${savePath}`;
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
