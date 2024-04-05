const mongoose = require('mongoose')
const login_details= new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        
    },
    password:{
        type:String,
        require:true
    },
    confirmpassword:{
        type:String,
        require:true
    }

})
module.exports = mongoose.model('LOGIN-details',login_details)