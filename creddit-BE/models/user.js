const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// pw validation
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const { valid } = require('joi');

// define what info should look like in the db
const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
});

// creates token for user
// used thorught the application so user doesnt have to login at every page
// contains encripted user identification
userSchema.methods.generateAuthToekn = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn: "7d"});
    return token
}

// create user model, for further operations later
const User = mongoose.model("user", userSchema);

// check if input is of the approprite form used for data in db
const validate = (data) => {
    const schema = joi.object({
        firstName: Joi.string.required().label("First Name"),
        lastName: Joi.string.required().label("Last Name"),
        email: Joi.string.required().label("Email"),
        password: passwordComplexity.required().label("Password")
    });
    return schema.validate(data)

};

module.exports = {User, validate};

