const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");



router.post("/", async (req, res) => {
	try {
        // validate email and password
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });


        // find user in db, or catch error
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

        // check if password input matches the password in db
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

        //To manage authentication, we generate a token that can be used by the client to make
        // further requests to the server without requiring the user to provide credentials again.
		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Validate that email and password are of valid form
const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;