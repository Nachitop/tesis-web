const express=require('express');
const router=express.Router();

const area=require('../controllers/area.controller');

router.post('/',area.createArea);
router.get('/', area.getAreas);


module.exports=router;