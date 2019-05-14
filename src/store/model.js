process.env.TEMPLATE_NAME = ''; // 客户终端选取base.json里哪个脚手架
process.env.APP_NAME = ''; // 客户终端开发者自定义项目名
process.env.APPENDS_NAME = ''; // 通过命令获取脚手架的子目录
process.env.APP_PATH = ''; // 项目存放路经
process.env.SYSTEM = ''; // 客户端系统类型
/**
 * 所有的状态码
 * @private
 */
global.__ERROR_STATUS__ = {
  ['write-error']: '10001@Write error',
  ['download-npm-fail']: '20002@Download npm fail',
  ['download-github-fail']: '20003@Download github fail',
  ['download-npmCli-fail']: '20004@Use cli fail',
  ['download-not-available']: '20005@Not available load channel',
  ['open-browser-fail']: '30001@Can not open browser'
};
