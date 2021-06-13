const router=require('express').Router()
const File=require('../models/file')
router.get('/:uuid',async(req,res)=>{
    try{
        const file=await File.findOne({uuid:req.params.uuid})
        if(!file){
            return res.render('download',{error:'Linked is Expired.'})
        }
        // res.json({uuid:file.uuid,
        //     fileName:file.filename,
        //     download:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
        //     fileSize:file.size,
        //     error:''})
        return res.render('download',{
            uuid:file.uuid,
            fileName:file.filename,
            download:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
            fileSize:file.size,
            error:'',
            // fileLoc:`${__dirname}+ '\..\uploads\${file.filename}'`
        })
    }catch(err){
        return res.render('download',{error:'Something went wrong.!'})
    }

})
module.exports=router;
