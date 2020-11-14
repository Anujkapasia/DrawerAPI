const express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })



const imagesToPdf = require("images-to-pdf")
var cors = require('cors')
const app = express();
var fs = require('fs');

app.use(express.static('pdf'))
app.use(cors())

app.post('/change', upload.single('photo'),(req,res)=>{
    fs.rename(`./uploads/${req.file.filename}`,`./uploads/${req.file.filename}.png`,()=>changeToPDf(req.file.filename))
    // res.json({link: `https://drawerapi.herokuapp.com:3030/pdf/${req.file.filename}.pdf`})
    res.end(`https://drawerapi.herokuapp.com/${req.file.filename}.pdf`);
})

app.get('/',(req,res)=>{
    res.send("heyyyy")
})

async function changeToPDf (name){
    await imagesToPdf([`./uploads/${name}.png`], `./pdf/${name}.pdf`)
}



app.listen(80);

