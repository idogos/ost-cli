const shell = require('shelljs');
const command = 'npx spinacia-cli --redux';

function downloadNpmCli(command, savePath, directoryName = null) {
  return new Promise((resolve, reject) => {
    shell.exec(`${command} ${directoryName}`, { async: true }, function(code) {
      if(+code !== 0) {
        reject({
          __MSG__: __ERROR_STATUS__['download-npmCli-fail'],
          err: stderr
        });
      } else {
        const finalPath = `${savePath}/${directoryName}`;
        shell.mv(directoryName, finalPath);
        resolve(finalPath);
      }
    });
  });
}
module.exports = downloadNpmCli;
