const fs = require('fs');
const path = require('path');
const semver = require('semver');
const basePath = fs.realpathSync(process.cwd());
const execSync = require('child_process').execSync;
module.exports = {
  isYarnAvailable: function () {
    try {
      execSync('yarnpkg --version', {stdio: 'ignore'});
      return true;
    } catch (e) {
      return false;
    }
  },
  isNodeAvailable: function () {
    try {
      execSync('node --version', {stdio: 'ignore'});
      return true;
    } catch (e) {
      return false;
    }
  },
  checkNodeVersion: function () {
    return semver.satisfies(process.version, '>=8.3.0');
  }
};
