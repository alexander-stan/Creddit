const mongoose = require('mongoose');
const Joi = require('joi');

// define what info should look like in the db
const accountSchema = new mongoose.Schema({
    accessCard: {type: String, required: true},
    password: {type: String, required: true},
    cards: {type: [String], required: true}, // array of strings, note: create a custom type, and store a list of cards
});

// create account model, for further operations later
const Account = mongoose.model("card", accountSchema);


// check if input is of the appropriate form used for data in db
const validate = (data) => {
    const schema = Joi.object({
        accessCard: Joi.string().required().label("Access Card"),
        cards: Joi.array().items(Joi.string()).required(),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data)

};


module.exports = {Account, validate};