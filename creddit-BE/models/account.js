const mongoose = require('mongoose');

// define what info should look like in the db
const userSchema = new mongoose.Schema({
    accessCard: {type: String, required: true},
    password: {type: String, required: true},
    cards: {type: [String], required: true}, // array of strings, note: create a costom type, and store a list of cards
});
