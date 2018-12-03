'use strict';

const RandExp = require('randexp');

const suffix = `_${new RandExp(/[a-z]\w{0,20}/).gen()}`;

module.exports = 'tmp_' + getDateTime() + suffix;

function getDateTime() {
  let d = new Date(),
    year  = d.getFullYear() + '',
    month = d.getMonth() >= 9 ? (d.getMonth() + 1) + '' : '0' + (d.getMonth() + 1),
    day   = d.getDate() > 9 ? d.getDate() + '' : '0' + d.getDate(),
    hours = d.getHours() > 9 ? d.getHours() + '' : '0' + d.getHours(),
    min   = d.getMinutes() > 9 ? d.getMinutes() + '' : '0' + d.getMinutes();
  return year + month + day + '_' + hours + min;
}
