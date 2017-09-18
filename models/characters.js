
// models/recipe.js
const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {type: String, unique:true},
    creator: {type: String},
    born: {type: Number}
})

const character = mongoose.model('Character', characterSchema);

module.exports = character
