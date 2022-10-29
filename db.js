require('dotenv').config()
const mongoose = require('mongoose')
const encrypt = require('mongoose-encryption')

mongoose.connect('mongodb://localhost:27017/userDB')

const userSchema =new mongoose.Schema({
    email:String,
    password:String
})

console.log(process.env.SECRET_KEY);
userSchema.plugin(encrypt, { secret: process.env.SECRET_KEY , encryptedFields: ['password'] });
const User =  mongoose.model('User' , userSchema)



module.exports = {User}
