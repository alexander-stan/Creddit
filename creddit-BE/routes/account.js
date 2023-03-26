//** NOTES: Does a user belong to an account or whats the difference between a user and an account, we already have users stored in our db, do we need to store accounts in db */
//** THIS FILE MAY BE DELETED IF DEEMED USELESS */



const router = require("express").Router();
const {Account, validate} = require("../models/account");// user model for db access 
const bcrypt = require("bcrypt"); // used for hashing passwords

// User account creation, saving do tb?, validate input, with user model, then checking user login info with db 
router.post("/", async (req, res) => {
    try{
        // validate user info, via user.js validate function
        const{error} = validate(req.body);
        
        if(error)
            return res.status(400).send({ message: error.details[0].message});
            

        // create account
        const account = await Account.findOne({accessCard: req.body.accessCard }); 
        
        if (user)
            return res.status(409).send({ message: "Account with given email already exists"})

        
        // Hash the password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // save new user to db 
        await new User({...req.body, password: hashPassword}).save();


        res.status(201).send({message: "User created successfully"});
    }catch (error){
        res.status(500).send({message: "Internal Serer Error"});

    }


});

module.exports = router;