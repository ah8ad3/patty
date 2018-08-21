

const setting = (chai, server) => {
    describe('settings', () => {
        it('should GET fa page', function (done) {
            chai.request(server)
                .get('/fa')
                .end((err, res) => {
                    res.should.have.status(200);

                    done()
                })
        });
        it('should GET en page', function (done) {
            chai.request(server)
                .get('/en')
                .end((err, res) => {
                    res.should.have.status(200);

                    done()
                })
        });
        it('Redis connection', function (done) {
            require('./_redis');
            done()
        });

    });
};

module.exports = setting;
