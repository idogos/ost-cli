const inquirer = require('inquirer');
const { getInputPrompt, getChoicePrompt, scaffolds } = require('../src/prompt/section');
const APP_NAME = 'app-name';
const TEMPLATE_NAME = 'template-name';
const APPENDS_NAME = 'appends-name';

require('../src/store');

const getListFromObj = (scaffoldsObj) => [...Object.keys(scaffoldsObj)];
const getAppendsList = (list) => list.map(e => e.replace(/^--/, ''));

module.exports = function() {
  return getResultCollection();
};

async function getResultCollection() {
  let resultCollection = {};
  const inputPrompt = getInputPrompt(APP_NAME);
  const choicePrompt = getChoicePrompt(TEMPLATE_NAME, getListFromObj(scaffolds));
  inputPrompt.default = 'my-app';
  try {
    const inputResult = await inquirer.prompt([inputPrompt]);
    resultCollection = { ...resultCollection, ...inputResult };
    const choiceResult = await inquirer.prompt([choicePrompt]);
    resultCollection = { ...resultCollection, ...choiceResult };

    /* 处理通过命令获取的样板 */
    if(/cli/.test(resultCollection[TEMPLATE_NAME])) {
      const scaffoldsUnit = scaffolds[resultCollection[TEMPLATE_NAME]];
      const appends = getAppendsList(scaffoldsUnit.config.appends);
      const choicePrompt = getChoicePrompt(APPENDS_NAME, appends);
      const choiceExec = scaffoldsUnit.config.exec.replace(/{{appName}}/, resultCollection[APP_NAME]);
      const choiceResult = await inquirer.prompt([choicePrompt]);
      resultCollection = { ...resultCollection, ...choiceResult, ...{  exec: choiceExec } };
      __SET_TEMPLATE_NAME__(resultCollection[TEMPLATE_NAME]);
      __SET_APP_NAME__(resultCollection[APP_NAME]);
      __SET_APPENDS_NAME__(resultCollection[APPENDS_NAME]);
      return resultCollection;
    }

  } catch (err) {
    Promise.reject({
      __MSG__: __ERROR_STATUS__['write-error'],
      err
    });
  }
}

// getResultCollection();
// console.log(promptExec(promptList)
