const shell = require('shelljs');
const path = require('path');
const fs = require('fs');
const ora = require('ora');

const scaffolds = require('../../config/base').scaffolds;
const downloadGitHub = require('./downloadGitHub');
const downloadNpm = require('./downloadNpm');
const basePath = fs.realpathSync(process.cwd());
const savePath = path.resolve(basePath, path.join('.', process.env.NODE_ENV === 'local'? 'build' : ''));

global.spinner = ora(`loading...\n`);

async function load(directoryName = null) {
  shell.rm('-rf', savePath);
  const temName = process.env.TEMPLATE_NAME;
  const { channel, path, config } = scaffolds[temName];
  spinner.start('loading...\n');
  switch (channel) {
    case 'github':
      const branch = config['git-branch'];
      await downloadGitHub(`${path}${branch ? '#' + branch : ''}`, `${savePath}${directoryName ? '/' + directoryName : ''}`);
      break;
    case 'npm':
      await downloadNpm(path, savePath, directoryName);
      break;
    default:
      break;
  }
  spinner.succeed('succeed');
}

module.exports = load;

