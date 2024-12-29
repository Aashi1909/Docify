var express = require('express');
var router = express.Router();
var userModel = require("../models/userModel")
var bcrypt = require("bcryptjs")
/* GET home page. */
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
module.exports = router;
