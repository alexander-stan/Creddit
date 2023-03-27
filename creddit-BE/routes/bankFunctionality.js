/* this is an endpoint for the front end api to interact with the bank.js's transfer, deposit and withdraw functions */


/* 
Questions

Should there be a unique end point for every type of function?
Transfer endPoint
Deposit endPoint
Withdraw endPoint

How do i access the list of customer? 

*/
const router = require("express").Router();

const {User, validateUser} = require("../models/user");// user model for db access 
const { Account, validateAccount } = require("../models/account");
const { Card, validateCard } = require("../models/card");

// import classes for full bank functionality 
const Bank = require("../Classes/bank.js");
const CreditCard = require("../Classes/CreditCard");
const DebitCard = require("../Classes/DebitCard");
const Account = require("../Classes/Account");
const Customer = require("../Classes/Customer");




const myBank = new Bank();


router.post("/", async (req, res) => {


    try {
        
        // Check what the request is, call bank functions accordingly

        // What should the format for req be? 
        // func: TRANSFER || DEPOSIT || WITHDRAW
        // card1: card (for )
        // card2: card (for all)
        // both cards need to be 
        // amount: number (for all)
        // AccountType: 

        // If withdraw functionality goes through save and update the the new amounts into db
        if (req.body.func == "TRANSFER"){
            // transfer is expecting card1 to be of object type card1
            // u might have to 

        const success =  Bank.transfer(req.body.card1, req.body.card2, req.body.amount)
        if (!success) {
            return res.status(400).send({ message: "The transfer did succeed"});
        }
    
        // connect to db with new info, so it is important to write the use cases?
        
        // this is a template 

       // update db with new info, so its is important to code 
       await Account.findOneAndUpdate({ 'accessCard.id': req.body.card1.id }, { 'accessCard.balance': 'for this instance get the bal' }, { new: true }, function(err, doc) {
        if (err) throw err;
        console.log(doc);
      });

    }

        // If deposit functionality goes through save and update the the new amounts into db
        if (req.body.func == "DEPOSIT"){
            // transfer is expecting card1 to be of object type card1

            // u might have to instantiate it 
            /* 
            req.body.card1.accessnumber
            req.body.card1.balance
            ....

            const myCard = new debitCard(accessNumber, balance)
            
            */

        const success =  Bank.deposit(req.body.card1, req.body.amount);
        res.status(201).send({message: "Deposit went through"});
        if (!success) {
            return res.status(400).send({ message: "The deposit didn't go through"});
        }
    
    
    
         // update db with new info, so its is important to code 
         await Account.findOneAndUpdate({ 'accessCard.id': req.body.card1.id }, { 'accessCard.balance': 'for this instance get the bal' }, { new: true }, function(err, doc) {
            if (err) throw err;
            console.log(doc);
          });
    }


        // If withdraw functionality goes through save and update the the new amounts into db
        if (req.body.func == "WITHDRAW"){
            // transfer is expecting card1 to be of object type card1
            // u might have to 
        const success =  Bank.deposit(req.body.card1, req.body.amount);
        res.status(201).send({message: "Deposit went through"});
        if (!success) {
            return res.status(400).send({ message: "The deposit didn't go through"});
        }
        
    
        // update db with new info, so its is important to code 
        await Account.findOneAndUpdate({ 'accessCard.id': req.body.card1.id }, { 'accessCard.balance': 'for this instance get the bal' }, { new: true }, function(err, doc) {
            if (err) throw err;
            console.log(doc);
          });
    
    }



        
    } catch (error) {
        res.status(500).send({message: "Internal Bank Server Error"});
    }



});