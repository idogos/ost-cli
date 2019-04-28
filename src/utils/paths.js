const fs = require('fs');
module.exports = {
  basePath: fs.realpathSync(process.cwd())
};
