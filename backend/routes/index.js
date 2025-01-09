var express = require('express');
var router = express.Router();
var userModel = require("../models/userModel")
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
var docModel = require("../models/docModel")
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfParse = require('pdf-parse'); 
const crypto = require("crypto");


const mammoth = require("mammoth");
const PDFKit = require("pdfkit");

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

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

router.post("/convert", upload.single("file"), async (req, res) => {
  const file = req.file;
  const { type } = req.body;

  if (!file) {
    return res.json({ success: false, message: "Please upload a file!" });
  }

  try {
    const convertedDir = path.resolve(__dirname, "../converted");
    ensureDirectoryExists(convertedDir);

    if (type === "PDF") {
      const docxBuffer = fs.readFileSync(file.path);
      const { value: text } = await mammoth.extractRawText({ buffer: docxBuffer });

      const pdfDoc = new PDFKit();
      const pdfPath = path.join(convertedDir, `${file.originalname.split(".")[0]}.pdf`);
      const writeStream = fs.createWriteStream(pdfPath);

      pdfDoc.pipe(writeStream);
      pdfDoc.fontSize(12).text(text, { width: 500, align: "left" });
      pdfDoc.end();

      writeStream.on("finish", () => {
        return res.download(pdfPath, () => {
          fs.unlinkSync(file.path);
          fs.unlinkSync(pdfPath);
        });
      });

      writeStream.on("error", (error) => {
        console.error("Write Stream Error:", error);
        res.status(500).json({ error: "Failed to create PDF file." });
      });
    } 
      
    else {
      res.status(400).json({ error: "Invalid conversion type." });
    
  }
} catch (error) {
    console.error("Conversion Error:", error);
    res.status(500).json({ error: "Failed to convert the file." });
  }
});

const links = {};

router.post("/generate-link", (req, res) =>{
  const {docId} = req.body;
  if(!docId){
    return res.json({success: false, message:"Document is Required!"})
  }
    // Generate a unique hash
  const BASE_URL = "https://docify.com/docs";
  const uniqueHash = crypto.randomBytes(16).toString("hex");
  const link = `${BASE_URL}/${uniqueHash}`;

   // Save the link
   links[uniqueHash] = docId;
   res.json({success: true, message:"Link Generated Successfully", link:link})
})
// Get document by unique link
router.get("/:hash", (req, res) => {
  const { hash } = req.params;

  const docId = links[hash];
  if (!docId) {
    return res.json({ success: false, message: "Invalid link!" });
  }

  // Redirect or return document data
  res.json({ success: true, message: "Document found!", docId: docId });
});



module.exports = router;
