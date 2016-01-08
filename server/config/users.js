/**
 * Created by hridhya on 1/7/16.
 */
'use strict';
var express = require('express'),
    router = express.Router();

/* GET users listing. */
router.get('/home', function(req, res) {
    console.log('Hello');
    res.send('respond with a resource');
});

module.exports = router;
