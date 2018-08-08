const i18n = require('../settings/i18');

const locale_md = function (req, res, next) {
    if (req.body.locale !== undefined){
        i18n.setLocale(req.body.locale);
    }

    if (res.cookie.locale === undefined) {
        res.cookie.locale = 'en';
        i18n.setLocale('en');
    }
    else {
        i18n.setLocale(res.cookie.locale)
    }
    next()
};

module.exports = locale_md;
