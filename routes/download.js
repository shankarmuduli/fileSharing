const router=require('express').Router()
const File=require('../models/file')
router.get('/:uuid',async(req,res)=>{
    try{
        const file=await File.findOne({uuid:req.params.uuid})
        if(!file){
            return res.render('download',{error:'Linked is Expired.'})
        }
        console.log(file);
        const filePath=`${__dirname}/../uploads/${file.filename}`
        console.log(filePath);
        res.download(filePath)
    }catch(err){
        return res.render('download',{error:'Something went wrong.!'})
    }

})
module.exports=router;
