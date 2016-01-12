var path = require('path');
var url = require('url');

module.exports = function(app){
    //{user:'', position:{}}
    var posObj = [];
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

    app.get('/location', function(req, res) {
      console.log('posObj.length= ', posObj.length);
      var newPos = req.query;
      var position = JSON.parse(req.query.position);

      var userExists = false;

      for (var i = 0; i < posObj.length; i++) {
        console.log(posObj.length, position, posObj[i].user);
        if (req.query.name === posObj[i].user) {
          console.log('match');
          userExists = true;
          posObj[i].position = position;
        }
      }
      if (!userExists) {
        posObj.push({user: req.query.name, position: position});
      }
      res.json(posObj);
    });

};