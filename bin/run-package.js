const inquirer = require('inquirer');
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const generate = require('../src/generate');
const packages = require('../config/packages');
const { getInputPrompt, getChoicePrompt } = require('../src/prompt/section');
const APP_NAME = 'app-name';
const TEMPLATE_NAME = 'template-name';
const APPENDS_NAME = 'appends-name';
const PACKAGES_DIR = path.join(__dirname, '..', 'packages');

async function runPackage(program) {
  const appName = program.args[0];
  __SET_APP_NAME__(appName);
  await promptHandler();
  await loadHandler(__GET_APP_NAME__());
  generate(__GET_APP_PATH__());
}

async function promptHandler() {
  let resultCollection = {};
  const inputPrompt = getInputPrompt(APP_NAME);
  const choicePrompt = getChoicePrompt(TEMPLATE_NAME, packages);
  inputPrompt.default = 'my-app';
  try {
    const inputResult = await inquirer.prompt([inputPrompt]);
    resultCollection = { ...resultCollection, ...inputResult };
    const choiceResult = await inquirer.prompt([choicePrompt]);
    resultCollection = { ...resultCollection, ...choiceResult };
    __SET_TEMPLATE_NAME__(resultCollection[TEMPLATE_NAME]);
    __SET_APP_NAME__(resultCollection[APP_NAME]);
    __SET_APPENDS_NAME__(resultCollection[APPENDS_NAME]);
    return resultCollection;
  } catch (err) {
    Promise.reject({
      __MSG__: __ERROR_STATUS__['write-error'],
      err
    });
  }
}

function loadHandler(appName) {
  const basePath = fs.realpathSync(process.cwd());
  const savePath = process.env.NODE_ENV === 'local' ? path.resolve(basePath, path.join('.', 'build')) : '.'; // path.resolve(basePath, path.join('.', 'build'))
  const fromPath = path.resolve(PACKAGES_DIR, `${__GET_TEMPLATE_NAME__()}`);
  const finalSavePath = `${savePath}/${appName}`;
  shell.rm('-rf', finalSavePath);
  !fs.existsSync(savePath) &&  shell.mkdir(savePath);
  shell.cp('-R', fromPath, finalSavePath);
  __SET_APP_PATH__(finalSavePath);
  return Promise.resolve(finalSavePath);
}


module.exports = runPackage;
