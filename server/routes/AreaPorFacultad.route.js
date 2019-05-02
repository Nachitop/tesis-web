const express=require('express');
const router=express.Router();

const apf=require('../controllers/AreaPorFacultad.controller');

router.post('/',apf.create);
router.get('/facultad/:_idFacultad', apf.getAPFbyF);


module.exports=router;