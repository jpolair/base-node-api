var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose'); 
const { ObjectID } = require('mongodb');
var {Todo} = require('./db/models/todo');
var {User} = require('./db/models/user');

var app = express();
const port = process.env.PORT || 3000;

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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
        Todo.findById(id).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({todo});
        }, (err) => {
            res.status(400).send(err);
        });
});

app.listen(port, () => {
    console.log(`le serveur écoute le port ${port}`);
});

module.exports = { app };