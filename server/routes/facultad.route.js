const express=require('express');
const router=express.Router();

const facultad=require('../controllers/facultad.controller');

router.get('/:_id',facultad.getFacultad);
router.get('/status/:status?',facultad.getFacultades);
router.post('/',facultad.createFacultad);
router.put('/:_id',facultad.updateFacultad);
router.delete('/:_id',facultad.deleteFacultad);

module.exports=router;