const inquirer = require('inquirer');
const async = require('async');
const { promptList } = require('./section');

module.exports = function() {
  let resultCollection = {};
  return new Promise((resolve, reject) => {
    async.eachSeries(promptList,
      (prompt, next) => {
        prompt.default = process.env.APP_NAME;
        inquirer
          .prompt([prompt])
          .then(result => {
            resultCollection = { ...resultCollection, ...result };
            next();
          })
          .catch(err => {
            reject({
              __MSG__: __ERROR_STATUS__['write-error'],
              err
            });
          });
      }, (err) => {
        if(!err) {
          __SET_TEMPLATE_NAME__(resultCollection['template-name']);
          __SET_APP_NAME__(resultCollection['app-name']);
          resolve(resultCollection)
        } else {
          reject({
            __MSG__: __ERROR_STATUS__['write-error'],
            err
          });
        }
      });
  });
};
