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
  process.env.APP_NAME = an;
  return an;
};
