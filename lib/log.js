function danger(text) {
    console.log('\x1b[31m', `\n ${text}`);
}

function info(text) {
    console.log('\x1b[32m', `\n ${text}`);
}


module.exports = {
    danger: danger,
    info: info
};
