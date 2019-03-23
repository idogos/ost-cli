const shell = require('shelljs');
const path = require('path');
const fs = require('fs');
const ora = require('ora');

const scaffolds = require('../../config/base').scaffolds;
const downloadGitHub = require('./downloadGitHub');
const downloadNpm = require('./downloadNpm');
const basePath = fs.realpathSync(process.cwd());
const savePath = path.resolve(basePath, path.join('.', process.env.NODE_ENV === 'local' ? 'build' : '.'));

global.spinner = ora(`loading...\n`);

async function load(directoryName = null) {
  const temName = process.env.TEMPLATE_NAME;
  const { channel, path, config } = scaffolds[temName];
  let finalSavePath;
  spinner.start('loading...\n');
  switch (channel) {
    case 'github':
      const branch = config['git-branch'];
      finalSavePath = await downloadGitHub(`${path}${branch ? '#' + branch : ''}`, `${savePath}${directoryName ? '/' + directoryName : ''}`);
      break;
    case 'npm':
      finalSavePath = await downloadNpm(path, savePath, directoryName);
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

module.exports = load;

