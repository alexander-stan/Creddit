const mongoose = require('mongoose');


// define what info should look like in the db
const userSchema = new mongoose.Schema({
    id: {type: String, required: true},
    expireDate: {type: String, required: true},
    balance: {type: String, required: true},
    transactionHistory: {type: [String], required: true}, // the type may not be of [String]??
});