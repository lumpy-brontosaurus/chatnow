/**
 * Created by hridhya on 1/10/16.
 */
var path = require('path');
var url = require('url');

module.exports = function(app){
    var posObj = [{user:'', position:{}}];
    var user = '';

    app.post('/api/add', function(req, res){
        console.log(req.body[0].user);
        user = req.body[0].user;
        posObj.push({user: user});
        res.send(204,'Posted');
    });

    app.get('/api/add', function(req, res){
        res.json(posObj);
        console.log(posObj);

    });

    app.get('/position', function(req, res){
        var newPos = req.query;
        for (var i in newPos){
            console.log(i);
            posObj.push({user: user, position: i});
        }
        res.json(posObj);
    });

};
