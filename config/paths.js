'use strict';
const path = require('path');
const fs = require('fs');

const basePath = fs.realpathSync(process.cwd());
const localOutput = 'build';
const localTmpName = 'package';

module.exports = {
  localOutput,
  localTmpName,
  basePath
};

