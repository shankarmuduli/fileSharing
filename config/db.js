require('dotenv').config()
const mongoose=require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
    const connection = mongoose.connection;
    connection.once('open',()=>{
        console.log("DataBase connected");
    }).catch(err=>{
        console.log(`Connection Failed with error:${err}`);
    })
}
module.exports=connectDB;