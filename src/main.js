// import modules from 'modules';
const modules = require('./modules');

export default function checkINN (value, country = 'russia') {
    const lengthList = modules[country].getValidLength();
    if (!lengthList.includes(value.length)) return 'invalid length';

    const regexp = modules[country].getRegexp();
    if (!regexp.test(value)) return 'don\'t match regexp';

    if (!modules[country].checkSum(value)) return 'checksum didn\'t match';

    return true;
}