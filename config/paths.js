'use strict';
const path = require('path');
const fs = require('fs');

const env = require('./env');
const {local} = require('./test');
const indefiniteTmpPath = require('../lib/name');

const basePath = fs.realpathSync(process.cwd());

const templateUrl = 'Ironsub/react-cavalier';
const tmpPath = path.resolve(basePath, path.join('.', `.${indefiniteTmpPath}`));

const generatorPath = (_env) => {
  let buildPath = null;
  if(_env === env.local) {
    buildPath = local.path;
  } else if(_env === env.prod) {
    buildPath = '.';
  }
  return path.resolve(basePath, path.join('.', buildPath));
};

module.exports = {
  templateUrl,
  tmpPath,
  indefiniteTmpPath,
  generatorPath
};

