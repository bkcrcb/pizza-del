const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{ type: String, required: true },
    email: { type: String, required: true,unique:true },
    phone:{ type: String, required: true, unique:true },
    address:{ type: String, required: true },
    role: { type: String, default: 'customer' },
    password: { type: String, required: true }
    
},{collection: 'user',timestamps:true})

module.exports = mongoose.model('User', userSchema)