const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');

const app = express();
const ObjectId = require('mongodb').ObjectID;

const mongoose = require('mongoose');
const Character = require('./models/characters')
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/characters');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.get('/', function(req, res) {
  Character.find()
    .then(function(characters) {
      res.render('index', {characters: characters})
    })
    .catch(function(error) {
      console.log('error ' + JSON.stringify(error));
    })
})
//
// Character.create(
// { name: ['Horshel'],
//   creator: ['Bingsi'],
//   born: [0909]
// },
// { name: ['Peter'],
//   creator: ['Bingsi'],
//   born: [0910]
// },
// { name: ['Kind_der_Garten'],
//   creator: ['Bingsi'],
//   born: [0921]
// }
// );


app.post('/newDood', function(req, res) {
  let name = req.body.Name
  let creator = req.body.Creator
  let born = req.body.Born

  const character = new Character({
    name: name,
    creator: creator,
    born: born
  });
  character.save()
    .then(function(results) {
      console.log("saved " + results);
      return Character.find()
    }).then(function(characters) {
      console.log(characters);
      res.render('index', {characters: characters})
    })
    .catch(function(error) {
      console.log('error ' + JSON.stringify(error));
    })
})

app.post('/delete/:id', function(req, res) {
  let id = req.params.id;
  Sport.deleteOne({
      _id: new ObjectId(id)
    })
    .then(function() {
      res.redirect('/')
    })
    .catch(function(error, hobbie) {
      console.log('error ' + JSON.stringify(error));
      res.redirect('/')
    })
});

app.listen(3000, function() {
  console.log('Youre entering a very german place!');
})

process.on('SIGINT', function() {
  console.log("\nshutting down");
  mongoose.connection.close(function() {
    console.log('Mongoose default connection disconnected on app termination');
    process.exit(0);
  });
});
