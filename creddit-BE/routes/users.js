const router = require("express").Router();
const {User, validate} = require("../models/user");// user model for db access 
const bcrypt = require("bcrypt"); // used for hashing passwords

// User account creation, saving do tb?, validate input, with user model, then checking user login info with db 
router.post("/", async (req, res) => {
    try{
        // validate user info, via user.js validate function
        const{error} = validate(req.body);
        
        if(error)
            return res.status(400).send({ message: error.details[0].message});
            

        // Find the if a user with inputted email is in db, using User model
        const user = await User.findOne({email: req.body.email });
        
        if (user)
            return res.status(409).send({ message: "User with given email already exists"})

        
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