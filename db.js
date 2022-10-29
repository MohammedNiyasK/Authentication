require('dotenv').config()
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/userDB')

const userSchema =new mongoose.Schema({
    email:String,
    password:String
})


const User =  mongoose.model('User' , userSchema)



module.exports = {User}
