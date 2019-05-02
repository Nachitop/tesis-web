const express= require('express')
const router= express.Router();

const notificacion= require('../controllers/notificacion.controller');

router.get('/:facultad', notificacion.get);

module.exports=router;