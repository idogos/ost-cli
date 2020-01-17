const compressing = require('compressing');
compressing.zip.uncompress('../build/my-app.zip', '.')
  .then(res => {
  })
  .catch(err => {
    console.log(err);
  });
