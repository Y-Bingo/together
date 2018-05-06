var color = require('colors-cli/safe') // 彩色输出

var error = color.red.bold;
var warn = color.yellow;
var notice = color.blue.bold;
var success = color.green;
var info = color.skyblue;
var sig = color.yellow.bold.underline;
var log = color.blue_b;

module.exports = {
    error,warn,notice,success,info,sig,log
}