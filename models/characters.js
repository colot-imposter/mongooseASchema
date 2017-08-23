
// models/recipe.js
const mongoose = require('mongoose');

const charactersSchema = new mongoose.Schema({
    name: { first: String, last: String, nickname: String  },
    creator: String,
    born: Number,
    Location: [{
        Reality: String,
        World : String,
        City: { type: String, required: true }
    }],
    Personality: [{
        nihlistic: Boolean,
        emotion : String,
        physical: String
    }],
    childeren: Number,
    source: {type: String},
    objectId: Number
})

const characters = mongoose.model('Characters', charactersSchema);

module.exports = characters
