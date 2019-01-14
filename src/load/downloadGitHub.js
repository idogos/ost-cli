const download = require('download-git-repo');

function downloadGitHub(url, savePath) {
  const finalPath = `${savePath}`;
  return new Promise((resolve, reject) => {
    download(url, finalPath, null, function(err) {
      if(err) {
        console.log(err);
        reject({
          __MSG__: 'Download github fail',
          err
        });
      }
      resolve(finalPath);
    })
  });
}

module.exports = downloadGitHub;
