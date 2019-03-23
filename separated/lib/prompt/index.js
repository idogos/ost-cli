const inquirer = require('inquirer');
const env = require('../../../config/env');
const promptMap = require('./config');

const confirmProjectName = (projectName) => ({
  name: 'project-name-bool',
  message: `是否使用该项目名?(${projectName})`,
  type: 'confirm',
  default: true
});

module.exports = function ({projectName = '', _env = env.prod}) {
  let executeResolve = function () {};
  switch (_env) {
    case env.local:
      executeResolve = interactiveLocal;
      break;
    case env.prod:
    default:
      executeResolve = interactive;
  }
  return new Promise((resolve, reject) => {
    try {
      resolve(executeResolve(projectName));
    } catch (err) {
      reject(err);
    }
  });
};

async function interactive(projectName) {
  let confirmProjectNameAnswer = await inquirer.prompt([confirmProjectName(projectName)]);
  let groupAnswer = null;
  let promptList = Object.values(promptMap);
  if (confirmProjectNameAnswer['project-name-bool']) {
    promptList.shift();
    groupAnswer = {
      ...await inquirer.prompt(promptList),
      ...{'project-name': projectName}
    };
  } else {
    groupAnswer = await inquirer.prompt(promptList);
  }
  return {...groupAnswer};
}

function interactiveLocal(projectName) {
  const createObj = {};
  for(let [key, value] of Object.entries(promptMap)) {
    createObj[value.name] = value.default;
    if(key === 'createProjectName') {
      createObj[value.name] = projectName;
    }
  }
  return {...createObj};
}

// latestVersion('react-orcrist-generator')
//   .then(version => {
//     console.log(version);
//   })
//   .catch(err => {
//     console.log(err);
//   });
