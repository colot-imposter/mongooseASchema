const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');

const app = express();

const mongoose = require('mongoose');
const characters = require('./models/characters')
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/models/characters');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.get('/index', function(req, res) {

  console.log(new characters({
    firstname: "Pfannkeucher"
  }));
  res.render('index')
})



// app.post('/newTodo', function(req, res) {
//     let neewbs = {}
//     // console.log(req.body.WhatagooataDah)
//     neewbs.name = req.body.WhatagooataDah
//     neewbs.completion = false
//     neewbs.id = todoListArray.length
//     todoListArray.push(neewbs)
//     res.render('todo', {todos: todoListArray})
// })
//
// function move(i) {
// todoListArray[i].completion = true;
// }
//
// app.post('/:id', function(req, res) {
//
// move(req.params.id)
// res.redirect('/')
//
// })

app.listen(3000, function() {
  console.log('Successfully started express application!');
})

process.on('SIGINT', function() {
  console.log("\nshutting down");
  mongoose.connection.close(function() {
    console.log('Mongoose default connection disconnected on app termination');
    process.exit(0);
  });
});
