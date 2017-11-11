var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose'); 
var {Todo} = require('./db/models/todo');
var {User} = require('./db/models/user');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text:req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('le serveur écoute le port 3000');
});

module.exports = { app };