const express=require('express');
const router=express.Router();

const usuario=require('../controllers/usuario.controller');

router.post('/',usuario.createUsuario);
router.put('/:_id',usuario.updateUsuario);
router.get('/:_id', usuario.getUsuario);
router.get('/filtrar/:status/:facultad', usuario.getUsuarios);
router.post('/login', usuario.login);
router.get('/matricula/:matricula',usuario.validarMatricula);
router.get('/email/:email',usuario.validarEmail);

module.exports=router;