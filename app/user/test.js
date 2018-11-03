const {UserModel} = require('./models');
const mongoose = require('mongoose');

const user = (chai, server) => {
    describe('Database Tests', function() {
        //Before starting the test, create a sandboxed database connection
        //Once a connection is established invoke done()

        before(function (done) {
            mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`);
            const db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error'));
            db.once('open', function () {
                console.log('We are connected to test database!');
                done();
            });
        });

        describe('Test Database', function () {
            //Save object with 'name' value of 'Mike"
            it('New name saved to test database', function (done) {
                let user = new UserModel();
                user.local.email = 'ahmad';
                user.local.password = 'lbn';
                user.info.first_name = 'ahmad';
                user.save(done);
            });

            // it('Dont save incorrect format to database', function (done) {
            //     //Attempt to save with wrong info. An error should trigger
            //     var wrongSave = Name({
            //         notName: 'Not Mike'
            //     });
            //
            //     wrongSave.save(err => {
            //         if (err) {
            //             return done();
            //         }
            //         throw new Error('Should generate error!');
            //     });
            // });

            it('Should retrieve data from test database', function (done) {
                //Look up the 'Mike' object previously saved.
                UserModel.find({'local.email': 'ahmad'}, (err, name) => {
                    if (err) {
                        throw err;
                    }
                    if (name.length === 0) {
                        throw new Error('No data!');
                    }
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
            it('should have 400 error on register user (email error)', (done)=> {
                let user = {
                    email: "",
                    password: "someCah$%26"
                };
                chai.request(server)
                    .post('/register')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done()
                    });
            });
            it('should have 400 error on register user (email and password error)', (done)=> {
                let user = {
                    email: "",
                    password: ""
                };
                chai.request(server)
                    .post('/register')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done()
                    });
            });
        });
        describe('/GET login', () => {
            it('it should GET login page', (done) => {
                chai.request(server)
                    .get('/login')
                    .end((err, res) => {
                        res.should.have.status(200);
                        // res.body.should.be.a('array');
                        // res.body.length.should.be.eql(0);
                        done();
                    });
            });
        });

        describe('/GET local and google', () => {
            it('it should GET local page', (done) => {
                chai.request(server)
                    .get('/connect/local')
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });

        describe('/POST login', () => {
            it('should logged in', (done)=> {
                let user = {
                    email: "some@example.org",
                    password: "someCah$%26"
                };
                chai.request(server)
                    .post('/login')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done()
                    });
            });
            it('should error on login user', (done)=> {
                let user = {
                    email: "",
                    password: "someCah$%26"
                };
                chai.request(server)
                    .post('/login')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done()
                    });
            });
            it('should error on login user', (done)=> {
                let user = {
                    email: "",
                    password: ""
                };
                chai.request(server)
                    .post('/login')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done()
                    });
            });
        });

        describe('User model', () => {
            it('should create user', function (done) {
                let user = new UserModel();
                user.local.email = 'ahmad';
                user.local.password = 'lbn';
                user.info.first_name = 'ahmad';
                user.save(done);
            });
            it('should get list user', function (done) {
                UserModel.find({}, (err, user) => {
                    user.length.should.not.be.eql(0);
                    done()
                })
            });
        });

        describe('JWT', () => {
            let token;
            it('should error for wrong email and password', function (done) {
                let user = {
                    email: "as@asafdf.com",
                    password: "sfdv"
                };
                chai.request(server)
                    .post('/obtain-jwt')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done()
                    })
            });
            it('should error for missing email and password', function (done) {
                chai.request(server)
                    .post('/obtain-jwt')
                    .end((err, res) => {
                        res.should.have.status(400);
                        done()
                    })
            });
            it('should error for wrong password', function (done) {
                let user = {
                    email: "some@example.org",
                    password: "meCah$%26"
                };
                chai.request(server)
                    .post('/obtain-jwt')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done()
                    })
            });
            it('should get jwt key', function (done) {
                let user = {
                    email: "some@example.org",
                    password: "someCah$%26"
                };
                chai.request(server)
                    .post('/obtain-jwt')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(200);
                        token = res.body.token;
                        done()
                    })
            });
            it('should check for jwt with 403 status code', function (done) {
                chai.request(server)
                    .get('/api/v10/user/jwt-check')
                    .end((err, res) => {
                        res.should.have.status(403);
                        done()
                    })
            });
            it('should check for jwt with 400 status code', function (done) {
                let _token = {
                    token: "assf.sdfvsdv"
                };
                chai.request(server)
                    .get('/api/v10/user/jwt-check')
                    .send(_token)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done()
                    })
            });
            it('should check for jwt with 200 status code', function (done) {
                let _token = {
                    token: token
                };
                chai.request(server)
                    .get('/api/v10/user/jwt-check')
                    .send(_token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done()
                    })
            });
        });
        //After all tests are finished drop database and close connection
        // after(function (done) {
        //     mongoose.connection.db.dropDatabase(function () {
        //         done()
        //     });
        // });
    });

    describe('User App', () => {
        beforeEach((done) => {
            done()
        });
        describe('/ GET profile page', () => {
            it('should GET profile page', function (done) {
                chai.request(server)
                    .get('/profile')
                    .end((err, res) => {
                        res.should.have.status(401);
                        done();
                    });
            });
        });
        describe('/ GET home page', () => {
            it('should GET homepage', function (done) {
                chai.request(server)
                    .get('/')
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
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

        describe('/GET 404 error', () => {
            it('it should GET local page', (done) => {
                chai.request(server)
                    .get('/loginn')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
        });

        describe('/GET logout', () => {
            it('it should GET logout page', (done) => {
                chai.request(server)
                    .get('/logout')
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });

    });
};

module.exports = user;