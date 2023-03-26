const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { cardSchema } = require('./card');
const { userSchema } = require('./user');

// pw validation
const passwordComplexity = require("joi-password-complexity");
const { valid, required } = require('joi');



// define what info should look like in the db
const accountSchema = new mongoose.Schema({
    accessCard: { type: String, required: true },
    password: { type: String, required: true },
    cards: [{ type: cardSchema, required: true }], // list of custom type, structure in card.js
});

// creates token for user
// used throughout the application so user doesn't have to login at every page
// contains encrypted user identification
accountSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, { expiresIn: "7d" });
    return token
}

// create account model, for further operations later
const Account = mongoose.model("account", accountSchema);


// check if input is of the appropriate form used for data in db
const validate = (data) => {
    const schema = Joi.object({
        accessCard: Joi.string().required().label("Access Card"),
        cards: Joi.array().items(cardSchema).required(),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data)

};


module.exports = { Account, validate, accountSchema };