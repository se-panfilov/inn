const COUNTRIES = {};

function checkLength (length, rules) {
    const variations = Object.keys(rules.variations);
    const arr = [];
    variations.forEach(v => arr.push(rules.variations[v]._length));

    return arr.some(v => v === length);
}

// eslint-disable-next-line no-unused-vars
var toExport = {
    checkINN: (value, country = 'russia') => {
        const rules = COUNTRIES[country].rules;
        if (!checkLength(value.length, rules)) return 'invalid length';

        if (!rules.regex.test(value)) return 'don\'t match regex';

        if (!COUNTRIES[country].checkVat(value)) return 'checksum didn\'t match';

        return true;
    }
};