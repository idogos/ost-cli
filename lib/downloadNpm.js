const urllib = require('urllib');

const httpClient = urllib.create();
const curl = httpClient.request;
const registry = 'https://registry.npmjs.org';

module.exports = function(target, saveDir = '.', callback) {
  const { path } = target;
  const version = path.split('@')[1];
  const url = `${registry}/${path}/${ version || 'latest' }`;
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
