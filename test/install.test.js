const spawn = require('cross-spawn-with-kill');
const path = require('path');
const fs = require('fs');
const basePath = fs.realpathSync(process.cwd());
const {isYarnAvailable} = require('../lib/check');
const {print} = require('../lib/print');
const tmpPath = path.resolve(basePath, path.join('.', `build/my-test-local`));

if (isYarnAvailable()) {
  const command = 'yarnpkg';
  const args = ['add', '--cwd', tmpPath];
  console.log(tmpPath);
  debugger;
  const child = spawn(command, args, {stdio: 'inherit'}).on('close', (err) => {
    if (err !== 0) {
      reject(err);
    }
    resolve();
  });
  child.kill();
} else {
  print({
    message: '当前未安装yarn，请手动安装',
    color: 'yellow'
  });
}

function dependenciesArray(dep) {
  let outPut = [];
  Object.keys(dep).forEach(name => {
    if (dep.hasOwnProperty(name)) {
      outPut.push(`${name}@${dep[name]}`);
    }
  });
  return outPut;
}
