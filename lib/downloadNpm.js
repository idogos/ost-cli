const urllib = require('urllib');

const httpClient = urllib.create();
const curl = httpClient.request;
const registry = 'https://registry.npmjs.org';

module.exports = function(pkgName, saveDir = '.', callback) {
  const version = pkgName.split('@')[1];
  const url = `${registry}/${pkgName}/${ version || 'latest' }`;
  curl(url, {
    dataType: 'json',
    followRedirect: true,
  })
    .then(rsp => {
      const tarball = rsp.data.dist.tarball;
      return curl(tarball, {
        streaming: true,
        followRedirect: true
      });
    })
    .then(rsp => {
      const res = rsp.res;
      compressing.tgz.uncompress(res, saveDir);
      callback(null);
    })
    .catch(err => {
      callback(err);
    })
};
