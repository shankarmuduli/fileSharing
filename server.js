const express=require('express');
const app=express()
const File=require('./models/file');
const fs=require('fs')
const connectDB = require('./config/db');
const ejs=require('ejs');
const path=require('path')
const schedule=require('node-schedule')
const PORT=process.env.PORT || 3000;
connectDB();
app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs')
app.use('/api/files',require('./routes/files'))
app.get('/',(req,res)=>{
    res.render('index')
})
app.use('/files/download',require('./routes/download'))
app.use('/files',require('./routes/show'))
schedule.scheduleJob('0 0 * * *',async ()=>{
    try{
        console.log("Hello");
        const pastDate=new Date(Date.now() -24 * 60 * 60 * 1000)
        console.log(pastDate);
        const FileList=await File.find({createdAt:{ $lte:new Date(pastDate).toISOString()}})
        if(FileList.length){
            for (const file of FileList){
                try{
                    fs.unlinkSync(file.path);
                    await file.remove();
                    console.log(`Successfully Deleted ${file.filename}`);
    
                }catch(err){
                    console.log(`Error while deleting file ${err}`);
    
                }
            }
            console.log('Job Done');
    
        }
    }catch(err){
        console.log(`Error while deleting file :${err}`);
    }
    
})
var server=app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})
// server.timeout = 1000;