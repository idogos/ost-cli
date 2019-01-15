const scaffolds = require('../../config/base').scaffolds;

module.exports = [{
  name: 'app-name',
  message: '如果需要更换项目名，请重新输入',
  type: 'input',
  default: '',
  choices: []
}, {
  name: 'template-name',
  message: '请选择样板工程类型',
  type: 'list',
  default: '',
  choices: [...Object.keys(scaffolds)]
}];
