const COUNTRIES = {};

function checkLength (length, rules) {
    const variations = Object.keys(rules.variations);
    const arr = [];
    variations.forEach(v => arr.push(rules.variations[v]._length));

    return arr.some(v => v === length);
}

const MESSAGES = {
    INVALID_LENGTH: 'INVALID_LENGTH',
    REGEX_DONT_MATCH: 'REXEX_DONT_MATCH',
    CHECKSUM_DONT_MATCH: 'CHECKSUM_DONT_MATCH',
    VALID: 'VALID'
};

function getMsg (value, rules, country) {
    if (!checkLength(value.length, rules)) return MESSAGES.INVALID_LENGTH;

    if (!rules.regex.test(value)) return MESSAGES.REGEX_DONT_MATCH;

    if (!COUNTRIES[country].checkVat(value)) return MESSAGES.CHECKSUM_DONT_MATCH;

    return MESSAGES.VALID;
}

// eslint-disable-next-line no-unused-vars
var toExport = {
    checkVAT: (value, country = 'russia') => {
        const rules = COUNTRIES[country].rules;
        const msg = getMsg(value, rules, country);

        return { result: msg === MESSAGES.VALID, msg, country };
    }
};