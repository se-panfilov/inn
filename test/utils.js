var expect = require('chai').expect;
var jsvat = require('../lib/inn');
var argv = require('minimist')(process.argv.slice(2));

var noVerbose = 'noverbose';

module.exports = {
    check: function (arr, msg, isTrue, countryName) {
        arr.forEach(function (item) {

            var testMsg = (argv.config !== noVerbose) ? msg + ': ' + item : 'test';

            return it(testMsg, function () {
                var result = jsvat.checkVAT(item);
                if (isTrue) {
                    expect(result.country).to.be.equal(countryName);
                    expect(result.result).to.be.true;
                    expect(result.msg).to.be.equal('VALID');
                } else {
                    expect(result.country).to.be.equal(countryName);
                    expect(result.result).to.be.false;
                    // TODO (S.Panfilov) checkmessage
                    // expect(result.msg).to.be.null;
                }
            });
        });
    },
    addCharsToVals: function (arr, char) {
        return arr.map(function (item) {
            var val = item.split('');
            val.splice(3, 0, char);
            val.splice(7, 0, char);
            return val.join('');
        });
    }
};