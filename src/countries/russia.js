// eslint-disable-next-line no-undef
COUNTRIES.russia = (() => {

    // const regex = [/^(RU)(\d{10}|\d{12})$/];
    const regex = [/^(\d{10}|\d{12})$/];
    const globalControlNumber = 11;
    const validLength = {
        short: 10,
        long: 12
    };
    const controlSequence = {
        short: [2, 4, 10, 3, 5, 9, 4, 6, 8],
        long: [
            [7, 2, 4, 10, 3, 5, 9, 4, 6, 8],
            [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]
        ]
    };

    const controlNumPosition = {
        short: -1,
        long: [-2, -1]
    };

    function checkVAT (vat, controlSequence, controlNumPosition) {
        const valArr = vat.toString().split('').map(v => +v);
        const controlNum = valArr[controlNumPosition];
        const numberArr = valArr.slice(0, controlNumPosition);
        const sum = numberArr.map((v, k) => v * controlSequence[k]).reduce((p, c) => p + c);

        return (sum % globalControlNumber) === controlNum;
    }

    function check10DigitVAT (vat) {
        // vat = 7830002293;
        return checkVAT(vat, controlSequence.short, vat.toString().length + controlNumPosition.short);
    }

    function check12DigitVAT (vat) {
        //val = 500100732259;
        const isFirstNumValid = checkVAT(vat, controlSequence.long[0], validLength.short + controlNumPosition.long[0]);
        const isSecondNumValid = checkVAT(vat, controlSequence.long[1], validLength.long + controlNumPosition.long[1]);

        return isFirstNumValid && isSecondNumValid;
    }

    return {
        getValidLength () {
            return validLength;
        },
        getRegexp () {
            return regex;
        },
        checkSum (vat) {
            return check10DigitVAT(vat) || check12DigitVAT(vat);
        }
    };
})();