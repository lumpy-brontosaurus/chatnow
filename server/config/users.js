'use strict';
var express = require('express'),
    router = express.Router();

router.get('/home', function(req, res) {
    console.log('Hello');
    res.send('respond with a resource');
});

module.exports = router;