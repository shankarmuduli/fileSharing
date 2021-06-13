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
schedule.scheduleJob('* * * * *',async ()=>{
    try{
        console.log("Hello");
        const pastDate=new Date(Date.now() -24 * 60 * 60 * 1000)
        console.log(pastDate);
        const FileList=await File.find({createdAt:{$lt:pastDate}})
        console.log(FileList);
        if(FileList.length){
            for (const file of FileList){
                try{
                    fs.unlinkSync(file.path);
                    await file.remove();
                    console.log(`Successfully Deleted ${file.filename}`);
    
                }catch(err){
                    console.log(`Error while deleting file ${file.filename}`);
    
                }
            }
            console.log('Job Done');
    
        }
    }catch{
        console.log({error:'Something went wrong.!'});

    }
    
})
var server=app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})
// server.timeout = 1000;