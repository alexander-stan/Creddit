/* this is an endpoint for the front end api to interact with the bank.js's transfer, deposit and withdraw functions */


/* 
Questions

Should there be a unique end point for every type of function?
Transfer endPoint
Deposit endPoint
Withdraw endPoint



*/
const router = require("express").Router();
const Bank = require("../Classes/bank.js") 
const myBank = new Bank();


router.post("/", async (req, res) => {


    try {



        
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }



});