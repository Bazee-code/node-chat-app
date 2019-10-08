// // unix epoch --> jan 1st 1970
// // var date = new Date();
// // var months = ['Jan','Feb']
// // console.log(date.getMonth());
// const moment = require('moment');

// var date = moment();
// date.add(12,'years');
// console.log(date.format('MMM Do YYYY'));

// exercise...print 10:35am
// const moment = require('moment');

// var date = moment();
// console.log(date.format("LT"));
const moment = require('moment');

var createdAt = new Date();
var date = moment(createdAt);

console.log(date.format('LT'));