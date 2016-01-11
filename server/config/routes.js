/**
 * Created by hridhya on 1/10/16.
 */
var path = require('path');
var url = require('url');

module.exports = function(app){
    var posObj = [{user:'', position:''}];
    var user = '';

    app.post('/add', function(req, res){
        console.log('POST');
        user = req.body;
        posObj.push({user: user});
        res.send(204,'Posted');
    });

    app.get('/position', function(req, res){
        var newPos = req.query;
        for (var i in newPos){
            posObj.push({user: user, position: i});
        }
        res.json(posObj);
    });

};
