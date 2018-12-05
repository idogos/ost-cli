const scaffolds = require('../../config/base').scaffolds;
module.exports = {
  createProjectName: {
    name: 'project-name',
    message: '请输入项目名:',
    type: 'input',
    default: ''
  },

  createVersion: {
    name: 'project-version',
    message: '请输入项目版本号:',
    type: 'input',
    default: '0.0.1'
  },

  createLicense: {
    name: 'project-license',
    message: '请选择许可类型:',
    type: 'list',
    default: '',
    choices: ['MIT', 'ISC']
  },

  createDescription: {
    name: 'project-description',
    message: '请输入关于这个项目的描述:',
    type: 'input',
    default: 'A React.js project'
  },

  createScaffolds: {
    name: 'project-scaffolds',
    message: '请选择样板工程类型',
    type: 'list',
    default: '',
    choices: [...Object.keys(scaffolds)]
  }
};
