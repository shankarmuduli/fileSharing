const File=require('./models/file');
const fs=require('fs')
const connectDb=require('./config/db')
connectDb()
async function deleteData(){
    const pastDate=new Date(Date.now() -24 * 60 * 60 * 1000)
    const FileList=await File.find({createdAt:{$lt:pastDate}})
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
}
deleteData().then(()=>{
    process.exit()
})