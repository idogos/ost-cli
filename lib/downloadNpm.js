const urllib = require('urllib');
const compressing = require('compressing');
const shell = require('shelljs');
const httpClient = urllib.create();
const registry = 'https://registry.npmjs.org';

module.exports = function(target, saveDir = '.', callback) {
  const { path } = target;
  if(path.includes('@')) throw new Error('Please write pkg name according to `pkgName@1.2.3` ');
  const version = path.split('@')[1];
  const pkgName = path.split('@')[0];
  const url = `${registry}/${pkgName}/${ version || 'latest' }`;
  httpClient.request(url, {
    dataType: 'json',
    followRedirect: true,
  })
    .then(rsp => {
      const tarball = rsp.data.dist.tarball;
      return httpClient.request(tarball, {
        streaming: true,
        followRedirect: true
      });
    })
    .then(rsp => {
      const res = rsp.res;
      compressing.tgz.uncompress(res, './uncompress')
        .then(() => {
          shell.mv('uncompress/package', 'uncompress/my-test-local');
          // shell.mv('uncompress/my-test-local', `${saveDir}`);
          // shell.rm('-rf', 'uncompress');
          callback(null);
        });
    })
    .catch(err => {
      callback(err);
    })
};
