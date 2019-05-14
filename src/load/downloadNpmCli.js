const shell = require('shelljs');
const path = require('path');
/**
 *
 * @param command Linux命令
 * @param savePath 项目保存路经（不含项目名）
 * @param directoryName 项目名
 * @param join 是否进行路经的拼接（针对测试环境的build目录）
 * @returns {Promise<any>}
 */
function downloadNpmCli(command, savePath, directoryName = null, join = false) {
  const finalAppPath = join ? `${path.basename(savePath)}/${directoryName}` : directoryName;
  // console.log();
  // console.log('finalAppPath:', finalAppPath);
  // console.log();
  const finalPath = `${savePath}/${directoryName}`;
  return new Promise((resolve, reject) => {
    shell.exec(`${command} ${finalAppPath}`, { async: true }, function(code, a, b, c, d) {
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
