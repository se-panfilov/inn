// eslint-disable-next-line no-unused-vars
var validator = (function () {

    'use strict';

    var COUNTRIES = {};

// eslint-disable-next-line no-unused-vars
    var toExport = {
        checkINN: function checkINN (value) {
            var country = arguments.length <= 1 || arguments[1] === undefined ? 'russia' : arguments[1];

            var lengthList = COUNTRIES[country].getValidLength();
            if (!lengthList.includes(value.length)) return 'invalid length';

            var regexp = COUNTRIES[country].getRegexp();
            if (!regexp.test(value)) return 'don\'t match regexp';

            if (!COUNTRIES[country].checkSum(value)) return 'checksum didn\'t match';

            return true;
        }
    };
    'use strict';

    COUNTRIES.russia = function () {

        var regex = [/^(RU)(\d{10}|\d{12})$/];

        function _check10DigitINN (val) {
            // val = 7830002293;
            const valArr = val.toString().split('');
            const multipliers = [2, 4, 10, 3, 5, 9, 4, 6, 8];
            const controlNum = valArr[valArr.length - 1];
            const numberArr = valArr.slice(0, valArr.length - 1);
            const sum = numberArr.map((v, k) => +v * +multipliers[k]).reduce((p, c) => p + c);

            return (sum % 11) === controlNum;
        }

        function _check12DigitINN (val) {
            //val = 500100732259;
            const valArr = val.toString().split('').map(v => +v);

            const multipliers1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
            const multipliers2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];

            const controlNum1 = valArr[valArr.length - 2];
            const controlNum2 = valArr[valArr.length - 1];

            const numberArr1 = valArr.slice(0, valArr.length - 2);
            const numberArr2 = valArr.slice(0, valArr.length - 1);

            const sum1 = numberArr1.map((v, k) => v * +multipliers1[k]).reduce((p, c) => p + c);
            const sum2 = numberArr2.map((v, k) => v * +multipliers2[k]).reduce((p, c) => p + c);

            return (sum1 % 11) === controlNum1 && (sum2 % 11) === controlNum2;
        }

        return {
            getValidLength: function getValidLength () {
                return [10, 12];
            },
            getRegexp: function getRegexp () {
                return regex;
            },
            checkSum: function checkSum (val) {
                return _check10DigitINN(val, this.rules) || _check12DigitINN(val, this.rules);
            }
        };
    }();

    if (typeof module === 'object' && module.exports) module.exports = toExport;

    return toExport;

})();