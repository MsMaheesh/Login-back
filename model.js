const mongoose = require("mongoose")
const tododata = new mongoose.Schema({
    todo:{
        type:String,
        require:true
    }
})
module.exports=mongoose.model("tododata",tododata)