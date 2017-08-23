
// models/recipe.js
const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: [String],
    creator: [String],
    born: [Number],
    Location: [{
        Reality: String,
        World : String,
        City: { type: String }
    }]

})

const character = mongoose.model('Character', characterSchema);

module.exports = character
