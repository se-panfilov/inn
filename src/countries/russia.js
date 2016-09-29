// eslint-disable-next-line no-undef
COUNTRIES.russia = (() => {

    const rules = {
        globalControlNumber: 11,
        regex: [/^(\d{10}|\d{12})$/],
        variations: {
            short: {
                _length: 10,
                sequences: [
                    [2, 4, 10, 3, 5, 9, 4, 6, 8]
                ],
                ctrlNumPos: [-1]
            },
            long: {
                _length: 12,
                sequences: [
                    [7, 2, 4, 10, 3, 5, 9, 4, 6, 8],
                    [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]
                ],
                ctrlNumPos: [-2, -1]
            }
        }
    };

    function checkSum (num, controlSequence, controlNumPosition) {
        const valArr = num.toString().split('').map(v => +v);
        const controlNum = valArr[controlNumPosition];
        const numberArr = valArr.slice(0, controlNumPosition);
        const sum = numberArr.map((v, k) => v * controlSequence[k]).reduce((p, c) => p + c);

        return (sum % rules.globalControlNumber) === controlNum;
    }

    function check10DigitVAT (vat) {
        // vat = 7830002293;
        const short = rules.variations.short;
        return checkSum(vat, short.sequences[0], short._length + short.ctrlNumPos[0]);
    }

    function check12DigitVAT (vat) {
        //val = 500100732259;
        const long = rules.variations.long;
        const isFirstNumValid = checkSum(vat, long.sequences[0], long._length + long.ctrlNumPos[0]);
        const isSecondNumValid = checkSum(vat, long.sequences[1], long._length + long.ctrlNumPos[1]);

        return isFirstNumValid && isSecondNumValid;
    }

    return {
        rules: rules,
        checkVat (vat, options) {
            return check10DigitVAT(vat) || check12DigitVAT(vat);
        }
    };
})();