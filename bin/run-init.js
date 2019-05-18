const load = require('../src/load');
const prompt = require('../src/prompt');
const generate = require('../src/generate');
async function runInit(program) {
  screen();
  const appName = program.args[0];
  __SET_APP_NAME__(appName);
  await prompt();
  await load(__GET_APP_NAME__());
  generate(__GET_APP_PATH__());
}

module.exports = runInit;
