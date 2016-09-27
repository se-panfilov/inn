'use strict';

const SRC = 'src';
const DEST = 'lib';
const PROJECT_NAME = 'inn';
const TESTS_SRC = 'tests';

const config = {
    dest: DEST,
    projectName: PROJECT_NAME,
    js: {
        src: [
            SRC + '/**/*.js'
        ]
    },
    tests: {
        src: [TESTS_SRC]
    }
};

module.exports = config;
