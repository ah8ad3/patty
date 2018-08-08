const commonRouter = require('../app/common/routes');
const userRouter = require('../app/user/routes');


function urls(app){
    app.use('/common', commonRouter);
    app.use('/', userRouter);

    app.use('/fa', function (req, res) {
        res.cookie.locale = 'fa';
        res.redirect('/');
    });
    app.use('/en', function (req, res) {
        res.cookie.locale = 'en';
        res.redirect('/');
    });

    // catch 404 and forward to error handler
    app.use(function(req, res) {
        res.status(404);
        res.send('Not Found');
    });

    // error handler
    app.use(function(err, req, res) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}

module.exports = urls;
