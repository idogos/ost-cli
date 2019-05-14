const path = require('path');
const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');
const system = require('../utils/system');

const scaffolds = require('../../config/base').scaffolds;
const downloadGitHub = require('./downloadGitHub');
const downloadNpm = require('./downloadNpm');
const downloadNpmCli = require('./downloadNpmCli');
const basePath = fs.realpathSync(process.cwd());
const savePath = path.resolve(basePath, path.join('.', process.env.NODE_ENV === 'local' ? 'build' : '.'));

global.spinner = ora(`loading...\n`);

async function load(directoryName = null) {
  const statusObj = await prepose();
  let useStatic;
  if(!statusObj.net) {
    console.log(chalk.red('当前设备似乎无法访问外部网址'));
    return;
  }
  if(/window/.test(statusObj.system)) {
    useStatic = true;
  }
  const temName = process.env.TEMPLATE_NAME;
  const { channel, path, config } = scaffolds[temName];
  let finalSavePath;
  spinner.start('loading...\n');
  switch (channel) {
    case 'github':
      const branch = config['git-branch'];
      finalSavePath = await downloadGitHub(
        `${path}${branch ? '#' + branch : ''}`,
        `${savePath}${directoryName ? '/' + directoryName : ''}`,
        useStatic
      );
      break;
    case 'npm':
      finalSavePath = await downloadNpm(
        path,
        savePath,
        directoryName
      );
      break;
    case 'npm-cli':
      const exec = config.exec.replace(/{{appName}}/, '');
      finalSavePath = await downloadNpmCli(
        exec,
        savePath,
        directoryName,
        process.env.NODE_ENV === 'local'
      );
      break;
    default:
      await Promise.reject({
        __MSG__: __ERROR_STATUS__['download-not-available'],
        err: {}
      });
  }
  __SET_APP_PATH__(finalSavePath);
  console.log('\n');
  spinner.succeed('succeed');
}

async function prepose() {
  const { getSystem, getNetStatus } = system;
  const netStatus = await getNetStatus('www.baidu.com');
  return Promise.resolve({
    system: getSystem(),
    net: netStatus
  });
}
module.exports = load;

