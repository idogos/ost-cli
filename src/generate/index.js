const getFileTree = require('../utils/getFileTree');
module.exports = function(filePath) {
  getFileTree({
    dest: filePath,
    index: 4,
    isParentLast: false,
    level: 2
  });
};
