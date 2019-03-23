'use strict';
const readLine = require('readline');
const chalk = require('chalk');

module.exports = {
  print: function(config) {
    const {message, color = '', style = '', status = ''} = config;
    if(color) {
      console.log(chalk[color](message));
    } else {
      console.log(message);
    }
  },
  clearConsole: function(message) {
    if (process.stdout.isTTY) {
      const blank = '\n'.repeat(process.stdout.rows);
      console.log(blank);
      readLine.cursorTo(process.stdout, 0, 0);
      readLine.clearScreenDown(process.stdout);
    }
    if(message) {
      console.log(message);
      console.log();
    }
  }
}
