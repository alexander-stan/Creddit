const mongoose = require('mongoose');
const Joi = require('joi');


// define what info should look like in the db
const cardSchema = new mongoose.Schema({
    id: {type: String, required: true},
    expireDate: {type: String, required: true},
    balance: {type: Number, required: true},
    transactionHistory: {type: [String], required: true}, // the type may not be of [String]??
});

// create account model, for further operations later
const Card = mongoose.model("card", cardSchema);


const validate = (data) => {
    const schema = Joi.object({
      id: Joi.string().required(),
      expireDate: Joi.string().required(),
      balance: Joi.number().required(),
      transactionHistory: Joi.array().items(Joi.object()).required(),
    });
  
    return schema.validate(data);
  };

  module.exports = {Card, validate};