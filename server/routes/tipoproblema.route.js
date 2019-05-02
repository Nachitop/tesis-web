const express=require('express');
const router= express.Router();

const tipoProblema=require('../controllers/tipoproblema.controller');

router.post('/',tipoProblema.createTipoProblema);
router.put('/:_id',tipoProblema.updateTipoProblema);
router.delete('/:_id',tipoProblema.deleteTipoProblema);
router.get('/:_id',tipoProblema.getTipoProblema);
router.get('/all/:status?',tipoProblema.getTipoProblemas);

module.exports=router;