const inquirer = require('inquirer');
const env = require('../config/env');
const latestVersion = require('latest-version');

const confirmProjectName = (projectName) => ({
  name: 'project-name-bool',
  message: `是否使用该项目名?(${projectName})`,
  type: 'confirm',
  default: true
});

const createProjectName = {
  name: 'project-name',
  message: '请输入项目名:',
  type: 'input',
  default: ''
};

const createVersion = {
  name: 'project-version',
  message: '请输入项目版本号:',
  type: 'input',
  default: '0.0.1'
};

const createLicense = {
  name: 'project-license',
  message: '请选择许可类型:',
  type: 'list',
  default: '',
  choices: ['MIT', 'ISC']
};

const createDescription = {
  name: 'project-description',
  message: '请输入关于这个项目的描述:',
  type: 'input',
  default: 'A React.js project'
};

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
}

async function interactive(projectName) {
  let confirmProjectNameAnswer = await inquirer.prompt([confirmProjectName(projectName)]);
  let groupAnswer = null;
  let promptList = [
    createProjectName,
    createVersion,
    createLicense,
    createDescription
  ];
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
  return {
    [createProjectName.name]: projectName,
    [createVersion.name]: createVersion.default,
    [createLicense.name]: createLicense.default,
    [createDescription.name]: createDescription.default
  }
}

// latestVersion('react-orcrist-generator')
//   .then(version => {
//     console.log(version);
//   })
//   .catch(err => {
//     console.log(err);
//   });
