/**
 * Created by hridhya on 1/10/16.
 */
var express = require('express');
var mongoose = require('mongoose');
var db = mongoose.connect(process.env.MONGOLAB_URI, function (error) {
    if(error){
        console.log(error);
    } else {
        console.log('mongo connected');
    }
});

module.exports = db;


// mongoose schema

var Schema = mongoose.Schema;

var User = new Schema({
    id        : String,
    name      : String
});

var Message = new Schema({
    id    : String,
    name  : String,
    text  : String
});

var user = mongoose.model(User);
var message = mongoose.model(Message);

var app = express();

app.listen(PORT || 3000);


model.exports = User;
