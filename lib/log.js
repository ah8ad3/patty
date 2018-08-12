function danger(text) {
    console.log('\x1b[31m', ` ${text}`);
}

function info(text) {
    console.log('\x1b[32m', ` ${text}`);
}


module.exports = {
    danger: danger,
    info: info
};
