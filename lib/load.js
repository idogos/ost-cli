'use strict';

const downloadGitHub = require('download-git-repo');
const shell = require('shelljs');
const ora = require('ora');
const downloadNpm = require('./downloadNpm');
const paths = require('../config/paths');
const base = require('../config/base');
const {local} = require('../config/test');
const {print} = require('./print');
const {tmpPath} = paths;
const scaffolds = base.scaffolds;
// const SCAFFOLD_NAME = 'react-cavalier';
let SCAFFOLD_NAME = 'react-cavalier';
let SCAFFOLDS;


const succeedMsg = `Download successfully`;
const failedMsg = `Download failed`;
const pendingMsg = `Download is in progress...`;

module.exports = function (data = {}) {
  SCAFFOLD_NAME = data.scaffolds;
  // SCAFFOLD_NAME = local.templateName;
  SCAFFOLDS = scaffolds[SCAFFOLD_NAME];
  return new Promise((resolve, reject) => {
    const spinner = ora(`${pendingMsg}\n`);
    spinner.start();
    LoadPoly((err) => {
      if (err) {
        spinner.fail(failedMsg);
        reject(`Download error: ${err}`);
      } else {
        spinner.succeed(succeedMsg);
        resolve(tmpPath);
      }
    });
  });
};

function LoadPoly(callback) {
  switch (SCAFFOLDS.channel.toLowerCase()) {
    case 'github':
      downloadGitHub(SCAFFOLDS, tmpPath, callback);
      break;
    case 'gitlab':
      downloadGitLab(SCAFFOLDS, tmpPath, callback);
      break;
    case 'npm':
      downloadNpm(SCAFFOLDS, tmpPath, callback);
      break;
    default:
  }
}

function downloadGitLab(target, tarPath, callback) {
  const {path, config} = target;
  let branch;
  if(path.includes('git')) branch = config['git-branch'];

  switch(branch) {
    case 'template':
      shell.exec(`git clone -b template ${path} ${tarPath}`, function(code) {
        shell.rm('-rf', `${tarPath}/.git`);
        callback(code !== 0);
      });
      break;
    case 'manage':
      shell.exec(`git clone -b manage ${path} ${tarPath}/repoTmp`, function(code) {
        shell.mv(`${tarPath}/repoTmp/template/*`, `${tarPath}`);
        shell.mv(`${tarPath}/repoTmp/template/.[^.]*`, `${tarPath}`);
        shell.rm('-rf', `${tarPath}/repoTmp`);
        callback(code !== 0);
      });
      break;
    default:
      print({
        message: 'config error',
        color: 'red'
      });
  }
}
