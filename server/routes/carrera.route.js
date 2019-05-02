const express=require('express');
const router=express.Router();

const carrera=require('../controllers/carrera.controller');

router.post('/',carrera.createCarrera);
router.put('/:_id',carrera.updateCarrera);
router.delete('/:_id',carrera.deleteCarrera);
router.get('/:_id',carrera.getCarrera);
router.get('/carreras/:status?/:facultad?',carrera.getCarreras);

module.exports=router;