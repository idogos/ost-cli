const ping = require('ping');
const url = 'https://baidu.com/';
const target = url.replace(/\/|https:|http:/g, '');
ping.sys.probe(target, function(isAlive) {
  const msg = isAlive ? 'host ' + target + ' is alive' : 'host ' + target + ' is dead';
  console.log(msg);
});
