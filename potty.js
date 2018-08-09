const fs = require('fs');
const program = require('commander');

if (!fs.existsSync('app/')) {
    fs.mkdirSync('app/');
}

program
    .version('0.1.0')
    .option('-c, --create-app [app_name]', 'Add name for app', false)
    .option('-t, --test', 'Test run')
    .parse(process.argv);

// -c command code check if app doesn't exist create app
if (program.createApp === true) {
    console.log('Please enter app name here');
} else if (program.createApp !== false){
    fs.readdir('app/', function(err, items) {
        if (items.includes(program.createApp)){
            console.log('App exist')
        }else {
            fs.mkdirSync('app/' + program.createApp);
            fs.writeFileSync('app/'+program.createApp + '/models.js', '');
            fs.writeFileSync('app/'+program.createApp + '/routes.js', '');
            fs.writeFileSync('app/'+program.createApp + '/test.js', '');
            fs.writeFileSync('app/'+program.createApp + '/messages.js', '');
            console.log('App %s created', program.createApp);
        }
    });
}


// test
if (program.test) {
    /*
    * need to first test structure then create this
    * */
    console.log('test in construction');
}
