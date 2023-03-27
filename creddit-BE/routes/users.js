const router = require("express").Router();
const {User, validateUser} = require("../models/user");// user model for db access 
const { Account, validateAccount } = require("../models/account");
const { Card, validateCard } = require("../models/card");
const bcrypt = require("bcrypt"); // used for hashing passwords
const myAccessCard = "";
const myPrimaryAccount = "";


// import aCustomer from "../Classes/Customer.js"
// import anAccount from "../Classes/Account.js"
// import aDebitCard from "../Classes/DebitCard.js"
// import aCreditCard from "../Classes/CreditCard.js"
const aCard = require("../Classes/card.js") 
const auth = require("../middleware/auth")


/* Access card? */
// User account creation, saving do tb?, validate input, with user model, then checking user login info with db 
router.post("/", async (req, res) => {
   
    // validate card data and add it to account
    try {
        // i think u get create a card with random generated id. bring that into here? 
        const accessCard = new aCard();
        const cardId = accessCard.getIdentifier();
        const expireDate = accessCard.getExpiryDate();
        const balance = accessCard.getBalance();
        const transactionHistory = accessCard.getTransactionHistory();
        
        if(error)
            return res.status(400).send({ message: error.details[0].message});

        myAccessCard = await new Card({id: cardId, expireDate: expireDate, balance: balance, transactionHistory: transactionHistory})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
        return;
    }

    // validate account data and save with user data in db
    try {
        // validate user info, via user.js validate function
        const{error} = validateAccount(req.body);  // this wont work 

        if(error)
            return res.status(400).send({ message: error.details[0].message});

         // Hash the password
         const salt = await bcrypt.genSalt(Number(process.env.SALT));
         const hashPassword = await bcrypt.hash(req.body.password, salt);
            
        // create acccount to be used later in the creation of the user
        myPrimaryAccount = await new Account({accessCard: myAccessCard, password: hashPassword, cards: []});

        if(error)
            return res.status(400).send({ message: error.details[0].message});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
        return;
    }

    // validate customer/user data and save to db
    try{
        // validate user info, via user.js validate function
        const{error} = validateUser(req.body);
        
        if(error)
            return res.status(400).send({ message: error.details[0].message});
            

        // Find if a user with inputted email is in db, using User model
        const user = await User.findOne({email: req.body.email });
        
        if (user)
            return res.status(409).send({ message: "User with given email already exists"});
        
        // save new user to db 
        await new User({...req.body.fullName, email: req.body.email, accounts: [].push(myPrimaryAccount) }).save();


        res.status(201).send({message: "User created successfully"});
    }catch (error){
        res.status(500).send({message: "Internal Server Error"});

    }
});

// This function loads all users from the db and send it to the front end, in json format
router.get("/", auth, async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server Error, failed to get users");
    }
})

module.exports = router;