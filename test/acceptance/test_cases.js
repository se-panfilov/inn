'use strict';

var jsvat = require('../../lib/inn');
var utils = require('../utils');

var countries = {};
countries.russia = require('./countries_vat_lists/russia.vat.js');

for (var countryName in countries) {
    if (countries.hasOwnProperty(countryName)) {
        var vatList = countries[countryName];
        makeTests(vatList, countryName);
    }
}

function makeTests (vatList, countryName) {
    describe(countryName + ' VAT.', function () {
        describe('Common checks.', function () {
            describe('Valid VAT.', function () {

                describe('Simple checks.', function () {
                    describe('Regular valid VAT.', function () {
                        utils.check(vatList.valid, 'Is VAT valid', true, countryName);
                    });

                    // describe('Valid VAT with \'-\' character.', function () {
                    //     utils.check(utils.addCharsToVals(vatList.valid, '-'), 'Is VAT valid', true, countryName);
                    // });

                    // describe('Valid VAT with space character.', function () {
                    //     utils.check(utils.addCharsToVals(vatList.valid, ' '), 'Is VAT valid', true, countryName);
                    // });
                });
            });

            describe('Invalid VAT.', function () {

                describe('Simple checks.', function () {

                    describe('Regular valid VAT.', function () {
                        utils.check(vatList.invalid, 'Is VAT valid', false, countryName);
                    });

                    // describe('Valid VAT with \'-\' character.', function () {
                    //     utils.check(utils.addCharsToVals(vatList.invalid, '-'), 'Is VAT valid', false, countryName);
                    // });

                    // describe('Valid VAT with space character.', function () {
                    //     utils.check(utils.addCharsToVals(vatList.invalid, ' '), 'Is VAT valid', false, countryName);
                    // });

                });
            });

        });

    });
}