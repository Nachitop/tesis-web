const express=require("express");
const router =express.Router();
const problema=require('../controllers/problema.controller');


const multer= require('multer');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        cb(null,new Date().toLocaleDateString()+"_"+file.originalname)
    },
    
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
   
 
}

const upload=multer({storage:storage,limits:{
    fileSize: 1024*1024*5 //5mb
}, fileFilter:fileFilter,
}).single('photo');

router.post('/',problema.createProblema);
router.get('/',problema.getProblemas);
router.post('/foto',upload,problema.subirFoto);
router.get('/etiquetas/:facultad/:area/:tipoproblema', problema.etiquetasPersonalizadas);
router.post('/votar', problema.votarProblema);
router.get('/:_id',problema.getProblema);
router.delete('/:_id',problema.deleteProblema);
router.put('/:_id',problema.editarProblema);
router.post('/solucionar',problema.solucionar);

module.exports=router;