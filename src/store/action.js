const hash = require('../utils/hash');
// 获取样板名
global.__GET_TEMPLATE_NAME__ = function() {
  return process.env.TEMPLATE_NAME;
};

// 设置样板名
global.__SET_TEMPLATE_NAME__ = function(tn) {
  process.env.TEMPLATE_NAME = tn;
  return tn;
};

// 获取自定义项目名
global.__GET_APP_NAME__ = function() {
  return process.env.APP_NAME;
};

// 设置自定义项目名
global.__SET_APP_NAME__ = function(an) {
  if(!an) an = 'app-' + hash();
  process.env.APP_NAME = an;
  return an;
};

// 设置子模版名
global.__SET_APPEND_NAME__ = function(an) {
  process.env.APPEND_NAME__ = an;
  return an;
};

// 获取子模版名
global.__GET_APPEND_NAME__ = function(an) {
  return process.env.APPEND_NAME__ = an;
};

// 设置项目存放地址
global.__SET_APP_PATH__ = function(ap) {
  process.env.APP_PATH = ap;
  return ap;
};

// 获取项目存放地址
global.__GET_APP_PATH__ = function() {
  return process.env.APP_PATH;
};
