const shell = require('shelljs');
const paths = require('../utils/paths');
const path = require('path');
/**
 *
 * @param command Linux命令
 * @param savePath 项目保存路经（不含项目名）
 * @param directoryName 项目名
 * @returns {Promise<any>}
 */
function downloadNpmCli(command, savePath, directoryName = null) {
  const finalAppPath = `${path.basename(savePath)}/${directoryName}`;
  const finalPath = `${savePath}/${directoryName}`;
  return new Promise((resolve, reject) => {
    shell.exec(`${command} ${finalAppPath}`, { async: true }, function(code, a, b, c, d) {
      console.log('-----');
      console.log('a:', a);
      console.log('-----');
      console.log('b:', b);
      console.log('-----');
      console.log('c:', c);
      console.log('-----');
      console.log('d:', d);
      if(+code !== 0) {
        reject({
          __MSG__: __ERROR_STATUS__['download-npmCli-fail'],
          err: stderr
        });
      } else {
        resolve(finalPath);
      }
    });
  });
}
module.exports = downloadNpmCli;
