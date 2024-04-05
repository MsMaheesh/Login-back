const express = require("express")
const routes = express.Router()
const model=require('./model')


const jwt = require('jsonwebtoken')
const dotenv= require('dotenv')
const middleware = require('./middleware')
const model_1 = require("./model_1")

// todo backend
routes.route("/getdata").get(async (req,res)=>{
    return res.send(await model.find())
})

routes.route("/addtodo").post(async (req,res)=>{
    const data={
        todo:req.body.todo
    }
    try{
        const da=new model(data)
        da.save()
        res.send(await model.find() )
    }
    catch(err){
        console.log(err)
    }
})

routes.route('/:id').put(async (req,res)=>{
    const data = {
        todo : req.body.todo
    }
    try{
        await model.findByIdAndUpdate( req.params.id,data)
        res.send(await model.find() ) 
    } 
    catch(err){
        console.log(err)
    } 
})

routes.route('/:id').delete(async (req,res)=>{
    await model.findByIdAndDelete(req.params.id)
    res.send(await model.find())
})
// routes.route('/getdata/:id').get(async (req,res)=>{
//     const data=await model.findById(req.params.id)
//     res.send(await data)
// })

//login backend
dotenv.config()

const key=process.env.mykey

routes.route('/register').post(async(req,res)=>{
    const {username,email,password,confirmpassword}=req.body
    //console.log(req.body,username)
    try{
        let exist = await model_1.findOne({email})
        if(exist){
            return res.send('email already resiater')
        }
        if(password != confirmpassword){
            return res.send('password not matching')
        }
        const da=new model_1({username, email, password, confirmpassword})
        await da.save()
        res.send("register successfully")
    }
    catch(err){
        console.log(err)
    }
})

routes.route('/login').post(async (req,res)=>{
    const {email,password}=req.body
    try{
        let exist = await model_1.findOne({email})
        if(!exist){
            return res.send("incorrect email")
        }
        if(exist.password != password){
            return res.send("incorrect password")
        }
        const payload={
            id:exist.id
        }
        // if(exist){
        //     const token =jwt.sign(payload,key,)
        //     res.send(token)
        // }
        const token =jwt.sign(payload,key,)
        //res.send("token generated")
        res.send(token) 
    }
    catch(err){console.log(err)}
})
routes.get('/todo', middleware, async(req,res)=>{
    //console.log(req)
    // console.log(req.user) 
    try{
       let exist = await model_1.findById(req.user.id)
       //console.log(exist)
       res.send(exist)
    }
    catch(err){
        console.log(err)
    }
})
routes.get('/logindata',async(req,res)=>{
    return res.send(await model_1.find()) 
})


module.exports= routes