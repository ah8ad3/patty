const log = require('./log');

const lib = (chai, server) => {
    describe('Libs', () => {
        it('log test', function (done) {
            log.info('test');
            log.danger('test');
            log.regular('test');
            done()
        });
    });
};

module.exports = lib;