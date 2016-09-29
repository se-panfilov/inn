// eslint-disable-next-line no-unused-vars
var validator = (function () {

    'use strict';

    var COUNTRIES = {};

    function checkLength (length, rules) {
        var variations = Object.keys(rules.variations);
        var arr = [];
        variations.forEach(function (v) {
            return arr.push(rules.variations[v]._length);
        });

        return arr.some(function (v) {
            return v === length;
        });
    }

// eslint-disable-next-line no-unused-vars
    var toExport = {
        checkINN: function checkINN (value) {
            var country = arguments.length <= 1 || arguments[1] === undefined ? 'russia' : arguments[1];

            var rules = COUNTRIES[country].rules;
            if (!checkLength(value.length, rules)) return 'invalid length';

            if (!rules.regex.test(value)) return 'don\'t match regex';

            if (!COUNTRIES[country].checkVat(value)) return 'checksum didn\'t match';

            return true;
        }
    };
    'use strict';

// eslint-disable-next-line no-undef
    COUNTRIES.russia = function () {

        var rules = {
            globalControlNumber: 11,
            regex: [/^(\d{10}|\d{12})$/],
            variations: {
                short: {
                    _length: 10,
                    sequences: [[2, 4, 10, 3, 5, 9, 4, 6, 8]],
                    ctrlNumPos: [-1]
                },
                long: {
                    _length: 12,
                    sequences: [[7, 2, 4, 10, 3, 5, 9, 4, 6, 8], [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]],
                    ctrlNumPos: [-2, -1]
                }
            }
        };

        function checkSum (num, controlSequence, controlNumPosition) {
            var valArr = num.toString().split('').map(function (v) {
                return +v;
            });
            var controlNum = valArr[controlNumPosition];
            var numberArr = valArr.slice(0, controlNumPosition);
            var sum = numberArr.map(function (v, k) {
                return v * controlSequence[k];
            }).reduce(function (p, c) {
                return p + c;
            });

            return sum % rules.globalControlNumber === controlNum;
        }

        function check10DigitVAT (vat) {
            // vat = 7830002293;
            var short = rules.variations.short;
            return checkSum(vat, short.sequences[0], short._length + short.ctrlNumPos[0]);
        }

        function check12DigitVAT (vat) {
            //val = 500100732259;
            var long = rules.variations.long;
            var isFirstNumValid = checkSum(vat, long.sequences[0], long._length + long.ctrlNumPos[0]);
            var isSecondNumValid = checkSum(vat, long.sequences[1], long._length + long.ctrlNumPos[1]);

            return isFirstNumValid && isSecondNumValid;
        }

        return {
            rules: rules,
            checkVat: function checkVat (vat, options) {
                return check10DigitVAT(vat) || check12DigitVAT(vat);
            }
        };
    }();

    if (typeof module === 'object' && module.exports) module.exports = toExport;

    return toExport;

})();