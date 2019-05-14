const open = require('open');
const url = 'aaa';
open(url)
.then(rsp => {
  console.log(rsp)
})
.catch(err => {
  console.log(err);
});
