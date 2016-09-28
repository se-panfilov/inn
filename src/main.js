const COUNTRIES = {};

// eslint-disable-next-line no-unused-vars
var toExport = {
    checkINN: (value, country = 'russia') => {
        const lengthList = COUNTRIES[country].getValidLength();
        if (!lengthList.includes(value.length)) return 'invalid length';

        const regexp = COUNTRIES[country].getRegexp();
        if (!regexp.test(value)) return 'don\'t match regexp';

        if (!COUNTRIES[country].checkSum(value)) return 'checksum didn\'t match';

        return true;
    }
};