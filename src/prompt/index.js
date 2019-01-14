const inquirer = require('inquirer');
const scaffolds = require('../../config/base').scaffolds;

const promptList = [{
  name: 'template',
  message: '请选择样板工程类型',
  type: 'list',
  default: '',
  choices: [...Object.keys(scaffolds)]
}];

module.exports = function() {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt(promptList)
      .then(result => {
        process.env.TEMPLATE = result.template;
        resolve(result);
      })
      .catch(err => {
        reject({
          __MSG__: 'Write error',
          err
        })
      })
  });
};
