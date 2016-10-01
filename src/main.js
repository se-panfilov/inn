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

function makeResponse (result, message, country) {
    return { result, message, country };
}

function getErrorMsg (value, rules, country) {
    if (!checkLength(value.length, rules)) return MESSAGES.INVALID_LENGTH;

    if (!rules.regex.test(value)) return MESSAGES.REGEX_DONT_MATCH;

    if (!COUNTRIES[country].checkVat(value)) return MESSAGES.CHECKSUM_DONT_MATCH;
}
// eslint-disable-next-line no-unused-vars
var toExport = {
    checkVAT: (value, country = 'russia') => {
        const rules = COUNTRIES[country].rules;
        const errorMsg = getErrorMsg(value, rules, country);
        const msg = errorMsg || MESSAGES.VALID;

        return makeResponse(!errorMsg, msg);
    }
};