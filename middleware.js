const jwt = require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()

const key = process.env.mykey

const tokenveryfie = function (req,res,next){

    try{
        let token = req.header('x-token') 
        if(!token){
            res.send("token not found")
        }
        let decode =jwt.verify(token,key)
        //console.log(decode,"ff")
        //console.log(decode.id,"ll")
        req.user = decode
        next()
    }
    catch(err){
        console.log(err)
        return res.send("invalied token")
    }
}
module.exports=tokenveryfie