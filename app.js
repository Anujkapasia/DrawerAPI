const express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })



const imagesToPdf = require("images-to-pdf")
const app = express();
var fs = require('fs');

app.use(express.static('pdf'))

app.post('/change', upload.single('photo'),(req,res)=>{
    fs.rename(`./uploads/${req.file.filename}`,`./uploads/${req.file.filename}.png`,()=>changeToPDf(req.file.filename)).then(res.end(""))
})

async function changeToPDf (name){
    await imagesToPdf([`./uploads/${name}.png`], `./pdf/${name}.pdf`)
}



app.listen(3030);

