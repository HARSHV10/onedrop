const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors")
const fs =require('fs');
const app = express()
const mongoose = require("mongoose");
app.use(express.json());
app.use(cors());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname.split('.')[0]+Date.now().toString()+'.'+file.originalname.split('.')[1]); // Use the original file name for storing
    },
  });
  
const upload = multer({ storage: storage });

mongoose.connect("mongodb://127.0.0.1:27017/fileStrorer").then((d)=>{
  // console.log(d);
}).catch((e)=>{
  console.log(e);
})

const FileInfo = mongoose.Schema({
  fileName:String,
  code:String,
})


const File = mongoose.model('File', FileInfo);

app.get('/',(req,res)=>{
    console.log("Hello")
    res.send("Hello")
})

app.post("/uploadFile",upload.single('file'),async (req,res)=>{
  try{

    // console.log(req.file);
    const filename = req.file.filename
    let ok = false;
    let label = Math.random.toString();
    while(!ok){
      label = (Math.random()*100000).toFixed().toString();
      const data = await File.findOne({code:label}).then((d)=>{
        if(d==null){
          ok =true;
        }
      })
    }

    const file = new File({
    fileName:filename,
    code:label
    })
    file.save().then((d)=>{
      console.log(d);
      }).catch(e=>{
      console.log(e);
      });
      const filePath = path.join(__dirname, 'uploads', filename)
      setTimeout(() => {
        console.log(filename);
        fs.unlink(filePath,async (err) => {
          if (err) {
            console.log("delete",err);
            throw err;
          }
          else{
            await File.deleteOne({
              fileName:filename
            }).then((d)=>{
              console.log(d);
            }).catch((e)=>{
              console.log(e);
            })
          }
          console.log("Delete File successfully.");
        });
      }, 900000);
      res.status(200).json({"label":label})
    }
    catch{
      res.status(500).json({"msg":error})
    }
    });

app.post("/download",async (req,res)=>{
    //uploads\AREmoji_20221204_133924_14890.jpg
    console.log(req.body.code);
    const code = req.body.code;
    const filename = await File.findOne({code:code}).then((d)=>{
      console.log(d);
      return d?.fileName
    }).catch((err)=>{
      console.log(err);
    })
    if(filename){
      const filePath = path.join(__dirname, 'uploads', filename)
      res.sendFile(filePath)
    }
    else{
      res.status(404).json({msg:"file not found"})
    }
    // res.send("Hello")
    // console.log(res)
    
  })
  
app.delete("/remove",(req,res)=>{
    console.log("delete")
      const filePath = path.join(__dirname, 'uploads', "test.pdf")
    
     
    console.log("Helo")
    res.send("Hello");

})


app.listen(3000,()=>{
    console.log("Hello")
})