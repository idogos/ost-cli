const ping = require('ping');
const os = require('os');
module.exports = {
  getSystem: function() {
    return os.type().toLowerCase();
  },
  getNetStatus: function(target) {
    target = target.replace(/\/|https:|http:/g, '');
    return new Promise((resolve, reject) => {
      ping.sys.probe(target, function(isAlive) {
        const msg = isAlive ? 'Network is alive' : 'Network is dead';
        console.log(msg);
        return isAlive ? resolve(true) : reject(false);
      });
    });
  }
};
