const express=require('express');
const app=express()
const connectDB = require('./config/db');
const ejs=require('ejs');
const path=require('path')
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
var server=app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})
server.timeout = 1000;