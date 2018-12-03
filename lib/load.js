'use strict';

const downloadGitHub = require('download-git-repo');
const downloadNpm = require('./downloadNpm');
const ora = require('ora');
const paths = require('../config/paths');
const base = require('../config/base');

const {tmpPath} = paths;
const scaffolds = base.scaffolds;
const SCAFFOLD_NAME = 'react-ost';
const SCAFFOLDS = scaffolds[SCAFFOLD_NAME];


const succeedMsg = `Download successfully`;
const failedMsg = `Download failed`;
const pendingMsg = `Download is in progress...`;

module.exports = function () {
  return new Promise((resolve, reject) => {
    const spinner = ora(`${pendingMsg}\n`);
    spinner.start();
    LoadPoly((err) => {
      if (err) {
        spinner.fail(failedMsg);
        reject(err);
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
      downloadGitHub(SCAFFOLDS.path, tmpPath, callback);
      break;
    case 'npm':
      downloadNpm(SCAFFOLDS.path, tmpPath, callback);
      break;
    default:
  }
}
