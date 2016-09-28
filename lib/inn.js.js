'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.default = checkINN;
// import modules from 'modules';
var modules = require('./modules');

function checkINN(value) {
    var country = arguments.length <= 1 || arguments[1] === undefined ? 'russia' : arguments[1];

    var lengthList = modules[country].getValidLength();
    if (!lengthList.includes(value.length)) return 'invalid length';

    var regexp = modules[country].getRegexp();
    if (!regexp.test(value)) return 'don\'t match regexp';

    if (!modules[country].checkSum(value)) return 'checksum didn\'t match';

    return true;
}