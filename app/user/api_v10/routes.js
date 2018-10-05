const express = require('express');
const router = express.Router();

const patty = require('../../../lib/patty');


router.use(patty.jwt_md);


router.get('/jwt-check', function (req, res) {
    return res.status(200).send('private state')
});


module.exports = router;
