process.env.TEMPLATE_NAME = ''; // 客户终端选取base.json里哪个脚手架
process.env.APP_NAME = ''; // 客户终端开发者自定义项目名
/**
 * 所有的状态码
 * @private
 */
global.__ERROR_STATUS__ = {
  ['write-error']: '10001@Write error',
  ['download-npm-fail']: '10002@Download npm fail',
  ['download-github-fail']: '10003@Download github fail'
};
