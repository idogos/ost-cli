const spawn = require('cross-spawn-with-kill');
const inquirer = require('inquirer');
const {isYarnAvailable} = require('./check');
const {print} = require('./print');
const env = require('../config/env');

module.exports = function (path, _env = env.prod) {
  const shouldInstallAuto = () => ({
    name: 'should-install',
    message: '是否自动安装依赖包',
    type: 'confirm',
    default: true
  });
  (async () => {
    if(_env === env.prod) {
      const shouldInstallAnswer = await inquirer.prompt([shouldInstallAuto()]);
      if (shouldInstallAnswer['should-install']) {
        if (isYarnAvailable()) {
          await execute();
        } else {
          log('yarn未安装，请选择手动安装依赖包');
        }
      } else {
        log();
      }
    } else {
      if (isYarnAvailable()) {
        await execute();
      } else {
        log('yarn未安装，请选择手动安装依赖包');
      }
    }
    function execute() {
      const command = 'yarnpkg';
      const _dependencies = require(`${path}/package.json`).dependencies;
      const _devDependencies = require(`${path}/package.json`).devDependencies;
      const dependencies = dependenciesArray(_dependencies);
      const devDependencies = dependenciesArray(_devDependencies);
      const depList = [...dependencies, ...devDependencies];
      const args = [];
      return new Promise((resolve, reject) => {
        args.length = 0;
        args.push('add');
        args.push(...depList);
        args.push('--cwd');
        args.push(path);
        const child = spawn(command, args, {stdio: 'inherit'}).on('close', (err) => {
          if (err !== 0) {
            reject(err);
          }
          resolve();
        });
        child.kill();
      });
      // [dependencies, devDependencies].map((dep, ids) => {
      //   return new Promise((resolve, reject) => {
      //     args.length = 0;
      //     args.push('add');
      //     args.push(...dep);
      //     if(ids === 1) {
      //       args.push('--dev');
      //     }
      //     args.push('--cwd');
      //     args.push(path);
      //     const child = spawn(command, args, {stdio: 'inherit'}).on('close', (err) => {
      //       if (err !== 0) {
      //         reject(err);
      //       }
      //       resolve();
      //     });
      //     child.kill();
      //   });
      // });
    }
  })()
    .catch(err => {

    });
};

function dependenciesArray(dep) {
  let outPut = [];
  Object.keys(dep).forEach(name => {
    if (dep.hasOwnProperty(name)) {
      outPut.push(`${name}@${dep[name]}`);
    }
  });
  return outPut;
}

function log(msg) {
  if(msg) {
    print({
      message: msg
    });
  } else {
    console.log();
  }
  print({
    message: `  cd <project-name>`,
    color: 'yellow'
  });
  print({
    message: `  npm install or yarn add`,
    color: 'yellow'
  });
  console.log();
}
