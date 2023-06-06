const express = require('express')
const User=require('./../module/User')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');
const router = express.Router()
const jwt = require('jsonwebtoken');
const JWT_Secert="GoravisSecert";
const fatchUser=require('./../middleware/fetchUser');
//create a user using: port'/api/auth/'
router.post('/',[
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],async (req,res)=>{
    let succus=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({succus,errors:errors.array()})
    }
    try{
        let user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({succus,error:"Enter unique email"})
    }
    const salt =await bcrypt.genSaltSync(10);
    const secPass=await bcrypt.hash(req.body.password,salt)
    user=await User.create({
       name:req.body.name,
       email:req.body.email,
       password: secPass
    })
    const data={
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data, JWT_Secert);
    console.log(token);
    succus=true;
    res.json({succus,token});
}catch(err){
    console.error(err);
    res.status(500).json({err:"Internal server error"})
}

})
//login
router.post('/login',[
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').exists().withMessage('Password cannot be blank')
],async (req,res)=>{
    let succus=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({succus,errors:errors.array()})
    }
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({succus,err:"Please try to login with correct credentials"})
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({succus,err:"Please try to login with correct credentials"})
        }
        const data={
            user:{
                id:user.id
            }
        }
        const token = jwt.sign(data, JWT_Secert);
        console.log(token);
        succus=true;
        res.json({succus,token});
    }catch(err){
        console.error(err);
        res.status(500).json({err:"Internal server error"})
    }
})
//userInfo
router.post('/userInfo',fatchUser, async (req,res)=>{
    
    try{
       let  userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
    }catch(err){
        console.error(err);
        res.status(500).json({err:"Internal server error"})
    }
})
module.exports=router;