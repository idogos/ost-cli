'use strict';
const chalk = require('chalk');

const title = '😃  Welcome to use Ost-cli';
const description = 'A mixture CLI for scaffolding JS projects ♍';
const version = require('../../package').version;
const colorSequence = [
  'green',
  'magenta',
  'cyan',
  'greenBright',
  'blueBright',
  'cyanBright'
];

const getColor = () => Math.floor(Math.random() * 5);
module.exports = function() {
  console.log();
  console.log(chalk[colorSequence[getColor()]](`${title} ${chalk[colorSequence[getColor()]](`v${version}`)}\n${description}\n`));
};
