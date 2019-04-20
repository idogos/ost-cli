const inquirer = require('inquirer');
const async = require('async');
const { promptList, scaffolds, getPromptList }= require('../src/prompt/section');

require('../src/store');

let resultCollection = {};
let deep = 0;
function promptExec(promptList) {
  async.eachSeries(promptList,
    (prompt, next) => {
      prompt.default = process.env.APP_NAME;
      inquirer
        .prompt([prompt])
        .then(result => {
          resultCollection = { ...resultCollection, ...result };
          const tplName = result['template-name'];
          if(tplName && /cli$/.test(tplName)) {
            const subList = getPromptList('appends-name', scaffolds[tplName].config.appends);
            deep++;
            promptExec([subList]);
            deep--;
          } else {
            next();
          }
        })
        .catch(err => {
          deep = 0;
          return Promise.reject({
            __MSG__: __ERROR_STATUS__['write-error'],
            err
          });
        });
    }, (err) => {
      if(!err) {
        __SET_TEMPLATE_NAME__(resultCollection['template-name']);
        __SET_APP_NAME__(resultCollection['app-name']);
        __SET_APPEND_NAME__(resultCollection['app-name']);
        console.log(deep);
        if(deep === 0) {
          return Promise.resolve(resultCollection);
        }
      } else {
        deep = 0;
        return Promise.reject({
          __MSG__: __ERROR_STATUS__['write-error'],
          err
        });
      }
    });
}

// console.log(promptExec(promptList)
