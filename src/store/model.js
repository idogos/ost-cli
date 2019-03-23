process.env.TEMPLATE_NAME = ''; // 客户终端选取base.json里哪个脚手架
process.env.APP_NAME = ''; // 客户终端开发者自定义项目名
process.env.APP_PATH = ''; // 项目存放路经
/**
 * 所有的状态码
 * @private
 */
global.__ERROR_STATUS__ = {
  ['write-error']: '10001@Write error',
  ['download-npm-fail']: '20002@Download npm fail',
  ['download-github-fail']: '20003@Download github fail',
  ['download-not-available']: '20004@Not available load channel'
};
