// kinda like includes
const mongoose = require("mongoose");

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        mongoose.connect(process.env.DB, connectionParams);
        console.log("Connected to database")
    } catch (error) {
        console.log("could not connect to database")

    }

}
