const express=require('express');
const router=express.Router();

const coleccion=require('../controllers/coleccionusuario.controller');

router.post('/',coleccion.createUsuario);
router.get('/:matricula', coleccion.getUsuario);


module.exports=router;