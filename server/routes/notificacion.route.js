const express= require('express')
const router= express.Router();

const notificacion= require('../controllers/notificacion.controller');

router.get('/:facultad', notificacion.get);
router.post('/',notificacion.create);
router.get('/status/:usuario/:fecha',notificacion.getNotificacion);

module.exports=router;