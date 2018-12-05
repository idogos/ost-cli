'use strict';
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

const print = require('./print').print;

module.exports = function (genera请选择样板工程类torFiles, projectName, rootName) {
  let _rootName = null;
  if(generatorFiles.length) {
    const isProjectExist = generatorFiles.filter(name => {
      const fileName = path.resolve(name);
      const isDir = fs.statSync(fileName).isDirectory();
      const baseName = path.basename(name);
      return baseName === projectName && isDir;
    }).length;
    if(isProjectExist !== 0) {
      print({message: `\n 🙁 ${chalk.yellow(projectName)} 已经存在,请重新为项目命名`});
      return false;
    }
    _rootName = projectName;
  } else if(rootName === projectName) {
    _rootName = '.';
  } else {
    _rootName = projectName;
  }
  return _rootName;
};
