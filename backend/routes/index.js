var express = require('express');
var router = express.Router();
var userModel = require("../models/userModel")
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
var docModel = require("../models/docModel")

const secret = "secret";
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/signUp", async(req, res) => {

  let {username, email, password, phone} = req.body;
  let emailCheck = await userModel.findOne({email:email});
  let phoneCheck = await userModel.findOne({phone:phone});
  if(emailCheck){
    return res.json({success:false, message:"Email already exist"})
  }
  else if(phoneCheck){
    return res.json({success:false, message:"Phone number already exist"})
  }
  else{
     bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if(err) throw err;
        let user = await userModel.create({username:username, email:email, password:hash, phone:phone})
        res.json({success:true, message:"User created successfully", userId : user._id})

     })
  })
  }
})

router.post("/login", async(req, res) =>{
  let {email,password} = req.body;
  let existedUser = await userModel.findOne({email:email});
  if(!existedUser){
    return res.json({success:false, message:"Invalid Email"})
  }
  let correctPassowrd = await bcrypt.compare(password, existedUser.password);
  if(!correctPassowrd){
    return res.json({success:false, message:"Incorrect password"})
  }
  else{
    var token =  jwt.sign({email:existedUser.email, userId:existedUser._id}, secret);
    return res.json({success:true, message:"Login successful", userId : existedUser._id, token:token})
  }
})

router.post("/createDoc", async (req, res) => {
  let {userId,docName} = req.body;
  let user = userModel.findById(userId);
  if(user){
    let doc = await docModel.create({
      uploadedBy:userId,
      title:docName
    });

    return res.json({success:true,message:"Document created successfully",docId:doc._id});
  }
  else{
    return res.json({success:false,message:"Invalid user"})
  }
});

router.post("/uploadDoc", async(req, res) =>{
  let{userId, docId, content} = req.body
  let user = userModel.findOne(userId);
  if(user){
    let doc = await docModel.findByIdAndUpdate(docId, {content:content})
    return res.json({success: true, message:"Document Uploaded Successfully"})
  }
  else{
    return res.json({success: false, message:"Invalid User!"})
  }
})

router.post("/getDoc", async(req, res)=>{
  let{userId, docId} = req.body;
  let user = userModel.findById(userId);
  if(user){
    let doc = await docModel.findById(docId);
    if(doc){
      return res.json({success:true, message:"Document fetched successfully", doc:doc})
    }
    else{
      return res.json({success: false, message:"Invalid Document!"})
    }
  }
  else{
    return res.json({success: false, message:"Invalid User!"})
  }
})

router.post("/deleteDoc", async(req, res)=>{
  let{userId, docId} = req.body
  let user = userModel.findById(userId);
  if(user){
    let doc = await docModel.findByIdAndDelete(docId)
    return res.json({success: true, message:"Document Deleted Successfully"})
  }
  else{
    return res.json({success: false, message:"Invalid User!"})
  }
})

router.post("/getAllDocs", async(req, res)=>{
  let{userId} = req.body;
  let user = userModel.findById(userId);
  if(user){
    let docs = await docModel.find({uploadedBy:userId})
    return res.json({success: true, message:"Document fetched Successfully", docs:docs})
  }
  else{
    return res.json({success: false, message:"Invalid User!"})
  }
})

module.exports = router;
