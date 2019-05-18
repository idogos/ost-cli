/**
 * 获取本地脚手架列表
 */
const fs = require('fs');
const path = require('path');
const PACKAGES_DIR = path.join(__dirname, '..', 'packages');
const originalItems = fs.readdirSync(PACKAGES_DIR);
const packagesList = originalItems
  .filter(item => {
    return item.includes('@');
  });
module.exports = packagesList;
