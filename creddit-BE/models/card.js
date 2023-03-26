const mongoose = require('mongoose');
const Joi = require('joi');


// sub schema, defining a transaction history type to store in db.
const transactionHistorySchema = new mongoose.Schema({
  transactionHistory: [{
    amount: { type: Number, required: true },
    date: { type: Date, required: true }
  }]
});

// define what info should look like in the db
const cardSchema = new mongoose.Schema({
  id: { type: String, required: true },
  expireDate: { type: Date, required: true },
  balance: { type: Number, required: true },
  transactionHistory: { type: transactionHistorySchema, required: true }, // the type may not be of [String]??
});



// create account model, for further operations later
const Card = mongoose.model("card", cardSchema);


const validateTransactionHistory = Joi.array().items(Joi.object({
  amount: Joi.number().required(),
  date: Joi.date().required()
}));

// Validate the information provided, use custom validate function for transaction history
const validateCard = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    expireDate: Joi.date().required(),
    balance: Joi.number().required(),
    transactionHistory: validateTransactionHistory.required(),
  });

  return schema.validate(data);
};

module.exports = { Card, validateCard, cardSchema };