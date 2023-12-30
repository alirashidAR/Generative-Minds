const mongoose = require('mongoose');
const uri ='mongodb+srv://Generative-Minds:DataBase5741@cluster0.uocx0db.mongodb.net/?retryWrites=true&w=majority'
const connectDB = async() => {
    try{
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    }
    catch(error){
        console.log(error);
    }
}

module.exports = connectDB;
