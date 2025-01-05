var express = require('express');
var router = express.Router();
var userModel = require("../models/userModel")
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
var docModel = require("../models/docModel")
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const secret = "secret";
const upload = multer({ dest: "uploads/" });

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


router.post("/getUser", async(req, res)=>{
  let{userId} = req.body;
  let user = await userModel.findById(userId);
  if(user){
    return res.json({success: true, message:"User fetched Successfully", user:user})
  }
  else{
    return res.json({success: false, message:"Invalid User!"})
  }
})

router.post("/logout", async(req, res)=>{
  let {userId} = req.body;
  let user = await userModel.findById(userId);
  if(user){
    return res.json({success: true, message:"User logged out Successfully"})
  }
  else{
    return res.json({success: false, message:"Invalid User!"})
  }
})

router.post("/convert", upload.single("file"), async(req, res)=>{
  const file = req.file;
  const {type} = req.body;
  if(!file){
    return res.json({success: false, message:"Please upload a file!"})
  }
  try{
    if (type === "PDF") {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const text = fs.readFileSync(file.path, "utf-8");

      // Embed a custom font
      const fontBytes = fs.readFileSync(path.resolve(__dirname, "../fonts/Roboto-Regular.ttf"));
      const customFont = await pdfDoc.embedFont(fontBytes);

      // Draw text with custom font
      page.drawText(text, {
        x: 50,
        y: page.getHeight() - 50,
        size: 12,
        font: customFont,
        color: rgb(0, 0, 0),
        lineHeight: 16,
      });

      const pdfBytes = await pdfDoc.save();
      const pdfPath = `converted/${file.originalname.split(".")[0]}.pdf`;
      fs.writeFileSync(pdfPath, pdfBytes);

      return res.download(pdfPath, () => {
        fs.unlinkSync(file.path);
        fs.unlinkSync(pdfPath);
      }); 
    }
    if(type === "DOCX"){
      const text = fs.readFileSync(file.path, "utf-8");
      const zip = new PizZip(text);
      const doc = new Docxtemplater(zip);

      doc.setData({content:text});
      doc.render();
      const buffer = doc.getZip().generate({ type: "nodebuffer" });
      const docxPath = `converted/${file.originalname.split(".")[0]}.docx`;

      fs.writeFileSync(docxPath, buffer);
      return res.download(docxPath, () => {
        fs.unlinkSync(file.path); // Clean up uploaded file
        fs.unlinkSync(docxPath); // Clean up converted file
      });
    }

    res.status(400).json({ error: "Invalid conversion type." });
    
  }catch (error) {
    console.error("Conversion Error:", error);
    res.status(500).json({ error: "Failed to convert the file." });
  }
})
module.exports = router;
