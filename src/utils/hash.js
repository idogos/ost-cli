const crypto = require('crypto');

module.exports = function() {
  const secret = Math.random() * 100 + '';
  const hash = crypto
    .createHmac('sha256', secret)
    .update('clear')
    .digest('hex');
  return hash.substring(0, 10);
};
