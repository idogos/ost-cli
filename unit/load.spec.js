const downloadGithub = require('../src/load/downloadGitHub');
require('../src/store');
const url = 'guibwl/spinacia-cli';
downloadGithub(url, './tmp')
  .then(rsp => {
    console.log(rsp);
  })
  .catch(err => {
    console.log('err:', err);
  });
