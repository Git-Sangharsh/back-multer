import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import userModel from "./models/Users.js";
import bodyParser from 'body-parser'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.json())

mongoose.connect("mongodb://127.0.0.1:27017/multerDb")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
    storage: storage
})


app.post('/upload', upload.single('file'),(req,res) => {

    const { imgName } = req.body;
    console.log(imgName)
    // console.log(req.file)
    userModel
      .create({ image: req.file.filename, imgName: imgName})
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
})

app.get("/getImage", (req, res) => {
  userModel
    .find()
    .then((users) => res.json(users))
    .catch((err) => console.log(err)); 
});

app.listen(4000, () => {
    console.log('port is live on 4000')
})