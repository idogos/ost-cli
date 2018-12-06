'use strict';

const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');
const path = require('path');
const glob = require('glob');
const shell = require('shelljs');
const chalk = require('chalk');

const print = require('./print').print;
const indefiniteTmpPath = require('../config/paths').indefiniteTmpPath;

const regSequence = {
  package: 'package.json'
};

const tmpPath = indefiniteTmpPath;

module.exports = function(data = {}, src, dest, isEngine = false) {
  let result = isEngine ?
    new Promise((resolve, reject) => {
      Metalsmith(__dirname, path.join('..', tmpPath))
        .metadata(data)
        .clean(true)
        .source(src)
        .destination(dest)
        .use(template)
        .build(err => {
          if(err) {
            print({
              message: '\n  🙁 Create failed',
              color: 'red'
            });
            reject(err);
          } else {
            // print({
            //   message: '\n  😃 Create succeed'
            // });
            console.log();
            readFileName(dest);
            readFiles(dest);
            resolve('Metalsmith succeed');
          }
          // fs.emptyDirSync(src);
          rm('-rf', src);
        })
    }) :
    (function() {
      shell.mv(`${src}/my-test-local`, dest);
      readFileName(dest);
      readFiles(dest);
      // rm('-rf', src);
      return Promise.resolve('Metalsmith succeed');
    })();
  return result;
};

function template(files, metalsmith, done) {
  const keys = Object.keys(files);
  const meta = metalsmith.metadata();
  keys.forEach(fileName => {
    if(fileName.indexOf(regSequence.package) > -1) {
      const str = files[fileName].contents.toString();
      files[fileName].contents = new Buffer(Handlebars.compile(str)(meta));
    }
  });
  done();
}

function readFiles(dest) {
  const baseName = path.basename(dest);
  const list = glob.sync(dest + '/*');
  console.log();
  console.log(chalk.cyan(`  ${baseName}`));
  list.map((file, idx) => {
    if(idx === list.length - 1) {
      console.log(chalk.cyan(`    └──${path.basename(file)}`));
    } else if(idx === 0) {
      console.log(chalk.cyan(`    ├──${path.basename(file)}`));
    } else {
      console.log(chalk.cyan(`    ├──${path.basename(file)}`));
    }
  });
  console.log();
}

function readFileName(dest) {
  const baseName = path.basename(dest);
  const projectName = chalk.yellow(baseName);
  const projectPath = chalk.yellow(dest);
  print({
    message: `  😃\n  Create ${projectName} successfully`
  });
  print({
    message: `  Path at ${projectPath}`
  });
}

