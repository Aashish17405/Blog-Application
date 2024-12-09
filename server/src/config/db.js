const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        console.log(process.env.MONGO_URI);
        console.log(typeof(process.env.MONGO_URI))
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to DB")
    }catch(err){
        console.error("Error connecting to DB:", err.message)
        process.exit(1);
    }
}

module.exports = connectDB;