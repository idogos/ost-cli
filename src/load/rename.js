const shell = require('shelljs');

module.exports = function(original, target) {
  shell.mv(original, target);
};
