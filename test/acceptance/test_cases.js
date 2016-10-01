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

                    describe('Valid VAT with \'-\' character.', function () {
                        utils.check(utils.addCharsToVals(vatList.valid, '-'), 'Is VAT valid', true, countryName);
                    });

                    describe('Valid VAT with space character.', function () {
                        utils.check(utils.addCharsToVals(vatList.valid, ' '), 'Is VAT valid', true, countryName);
                    });
                });
            });

            describe('Invalid VAT.', function () {

                describe('Simple checks.', function () {

                    describe('Regular valid VAT.', function () {
                        utils.check(vatList.invalid, 'Is VAT valid', false, countryName);
                    });

                    describe('Valid VAT with \'-\' character.', function () {
                        utils.check(utils.addCharsToVals(vatList.invalid, '-'), 'Is VAT valid', false, countryName);
                    });

                    describe('Valid VAT with space character.', function () {
                        utils.check(utils.addCharsToVals(vatList.invalid, ' '), 'Is VAT valid', false, countryName);
                    });

                });
            });

        });

        describe('Isolated VAT checks.', function () {

            describe('Config include current country.', function () {

                before(function () {
                    jsvat.config = [];
                    jsvat.config.push(countryName);
                });

                describe('Valid VAT.', function () {

                    describe('Simple checks.', function () {

                        describe('Regular valid VAT.', function () {
                            utils.check(vatList.valid, 'Is VAT valid', true, countryName);
                        });

                        describe('Valid VAT with \'-\' character.', function () {
                            utils.check(utils.addCharsToVals(vatList.valid, '-'), 'Is VAT valid', true, countryName);
                        });

                        describe('Valid VAT with space character.', function () {
                            utils.check(utils.addCharsToVals(vatList.valid, ' '), 'Is VAT valid', true, countryName);
                        });

                    });
                });

                describe('Invalid VAT.', function () {

                    describe('Simple checks.', function () {

                        describe('Regular valid VAT.', function () {
                            utils.check(vatList.invalid, 'Is VAT valid', false, countryName);
                        });

                        describe('Valid VAT with \'-\' character.', function () {
                            utils.check(utils.addCharsToVals(vatList.invalid, '-'), 'Is VAT valid', false, countryName);
                        });

                        describe('Valid VAT with space character.', function () {
                            utils.check(utils.addCharsToVals(vatList.invalid, ' '), 'Is VAT valid', false, countryName);
                        });

                    });
                });

                after(function () {
                    jsvat.config = [];
                });

            });

            describe('Config exclude current country.', function () {

                before(function () {
                    jsvat.config = [];
                    jsvat.config.push(countryName)
                });

                describe('Valid VAT.', function () {

                    describe('Simple checks.', function () {

                        describe('Regular valid VAT.', function () {
                            utils.check(vatList.valid, 'Is VAT valid', true, countryName);
                        });

                        describe('Valid VAT with \'-\' character.', function () {
                            utils.check(utils.addCharsToVals(vatList.valid, '-'), 'Is VAT valid', true, countryName);
                        });

                        describe('Valid VAT with space character.', function () {
                            utils.check(utils.addCharsToVals(vatList.valid, ' '), 'Is VAT valid', true, countryName);
                        });

                    });
                });

                describe('Invalid VAT.', function () {

                    describe('Simple checks.', function () {

                        describe('Regular valid VAT.', function () {
                            utils.check(vatList.invalid, 'Is VAT valid', false, countryName);
                        });

                        describe('Valid VAT with \'-\' character.', function () {
                            utils.check(utils.addCharsToVals(vatList.invalid, '-'), 'Is VAT valid', false, countryName);
                        });

                        describe('Valid VAT with space character.', function () {
                            utils.check(utils.addCharsToVals(vatList.invalid, ' '), 'Is VAT valid', false, countryName);
                        });

                    });
                });

                after(function () {
                    jsvat.config = [];
                });

            });

            describe('Config include other country.', function () {

                before(function () {
                    var otherCountry = 'sweden';
                    jsvat.config = [];
                    if (countryName === 'sweden') {
                        otherCountry = 'austria';
                    }

                    jsvat.config.push(otherCountry)
                });

                describe('Valid VAT.', function () {

                    describe('Simple checks.', function () {

                        describe('Regular valid VAT.', function () {
                            utils.check(vatList.valid, 'Is VAT valid', false, countryName);
                        });

                        describe('Valid VAT with \'-\' character.', function () {
                            utils.check(utils.addCharsToVals(vatList.valid, '-'), 'Is VAT valid', false, countryName);
                        });

                        describe('Valid VAT with space character.', function () {
                            utils.check(utils.addCharsToVals(vatList.valid, ' '), 'Is VAT valid', false, countryName);
                        });

                    });
                });

                describe('Invalid VAT.', function () {

                    describe('Simple checks.', function () {

                        describe('Regular valid VAT.', function () {
                            utils.check(vatList.invalid, 'Is VAT valid', false, countryName);
                        });

                        describe('Valid VAT with \'-\' character.', function () {
                            utils.check(utils.addCharsToVals(vatList.invalid, '-'), 'Is VAT valid', false, countryName);
                        });

                        describe('Valid VAT with space character.', function () {
                            utils.check(utils.addCharsToVals(vatList.invalid, ' '), 'Is VAT valid', false, countryName);
                        });

                    });
                });

                after(function () {
                    jsvat.config = [];
                });
            });

            describe('Config include multiple countries VAT checks.', function () {

                before(function () {
                    var otherCountries = ['sweden', 'russia', 'united_kingdom'];

                    jsvat.config = [];

                    if (countryName === 'sweden') otherCountries[0] = 'austria';
                    if (countryName === 'russia') otherCountries[1] = 'austria';
                    if (countryName === 'united_kingdom') otherCountries[2] = 'austria';

                    jsvat.config.push(otherCountries[0]);
                    jsvat.config.push(otherCountries[1]);
                    jsvat.config.push(otherCountries[2]);
                });

                describe('Valid VAT.', function () {

                    describe('Simple checks.', function () {

                        describe('Regular valid VAT.', function () {
                            utils.check(vatList.valid, 'Is VAT valid', false, countryName);
                        });

                        describe('Valid VAT with \'-\' character.', function () {
                            utils.check(utils.addCharsToVals(vatList.valid, '-'), 'Is VAT valid', false, countryName);
                        });

                        describe('Valid VAT with space character.', function () {
                            utils.check(utils.addCharsToVals(vatList.valid, ' '), 'Is VAT valid', false, countryName);
                        });

                    });
                });

                describe('Invalid VAT.', function () {

                    describe('Simple checks.', function () {

                        describe('Regular valid VAT.', function () {
                            utils.check(vatList.invalid, 'Is VAT valid', false, countryName);
                        });

                        describe('Valid VAT with \'-\' character.', function () {
                            utils.check(utils.addCharsToVals(vatList.invalid, '-'), 'Is VAT valid', false, countryName);
                        });

                        describe('Valid VAT with space character.', function () {
                            utils.check(utils.addCharsToVals(vatList.invalid, ' '), 'Is VAT valid', false, countryName);
                        });

                    });
                });

                after(function () {
                    jsvat.config = [];
                });
            });

        });

    });
}