const mongoose = require('mongoose');
const { accountSchema } = require('./account');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");



// define what info should look like in the db
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    accounts: [{ type: accountSchema, required: true }],

});



// create user model, for further operations later
const User = mongoose.model("user", userSchema);

// check if input is of the appropriate form used for data in db
const validateUser = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().required().label("Full Name"),
        email: Joi.string().required().label("Email"),
        accounts: Joi.array().items(accountSchema).required().label("Accounts"),
    });
    return schema.validate(data)

};

module.exports = { User, validateUser };

