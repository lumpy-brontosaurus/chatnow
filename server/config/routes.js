/**
 * Created by hridhya on 1/10/16.
 */
var path = require('path');
var url = require('url');

module.exports = function(app){

    var posObj = [];

    app.post('/home/add', function(req, res){

        console.log('POST');

    });

    app.get('/position', function(req, res){
        var newPos = req.query;
        for (var i in newPos){
            posObj.push({position: i});
        }
        res.json(posObj);
    });

};
