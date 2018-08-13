const {UserModel} = require('./models');

const user = (chai, server) => {
    describe('User App', () => {
        beforeEach((done) => {
            UserModel.remove({}, () => {
                done();
            });
        });
        describe('/GET register', () => {
            it('it should GET register page', (done) => {
                chai.request(server)
                    .get('/register')
                    .end((err, res) => {
                        res.should.have.status(200);
                        // res.body.should.be.a('array');
                        // res.body.length.should.be.eql(0);
                        done();
                    });
            });
        });
        describe('/POST register', () => {
            it('should register user', (done)=> {
                let user = {
                    email: "some@example.org",
                    password: "someCah$%26"
                };
                chai.request(server)
                    .post('/register')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(201);
                        done()
                    });
            });
        });
    });
};

module.exports = user;