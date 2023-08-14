const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    name:{
        type:String
    },
    address:{
        type:String
    },
    profile:{
        type:String
    },
    phone:{
        type:String
    }
})
module.exports = User = mongoose.model("user" , userSchema)