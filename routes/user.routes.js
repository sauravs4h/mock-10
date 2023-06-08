const express=require("express");
const {Usermodel}=require("../models/user.model")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



const user=express.Router();

// register

user.post("/register",async(req,res)=>{
    
    const payload=req.body;
    
    const email=payload.email;
    const password=payload.password;

    const useravailable= await Usermodel.findOne({email:email});

    if(useravailable){
        res.send({msg:"user is already available",status:"error"});
    }else{

        bcrypt.hash(password, 5 , async function(err, hash) {
            if(err){
                res.send({msg:"something went wrong",status:"error"})
            }else{
                payload.password=hash;
                const user= new Usermodel(payload);
                await user.save();

                res.send({msg:"signup successfull",status:"success"});
            }
        });
        
    }

   
})

// login

user.post("/login",async(req,res)=>{
    


    const payload=req.body;
    const email=payload.email;
    const password=payload.password;

    const useravailable= await Usermodel.findOne({email:email});
    const hashpassword=useravailable?.password;
    const user_id=useravailable?._id

    if(useravailable){

        bcrypt.compare(password, hashpassword, function(err, result) {
            if(result){
                var token = jwt.sign({ userid:  user_id }, 'hush');

                res.send({msg:"login successfull", token:token,status:"success"});
            }else{
                res.send({msg:"wrong craditionals",status:"error"})
            }
        });
        
    }else{        
        res.send({msg:"please register first",status:"error"});
    }

    
})

module.exports={user}