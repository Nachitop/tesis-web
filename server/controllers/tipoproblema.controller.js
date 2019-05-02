const tipoProblemaCtrl={};
const TipoProblema=require('../models/tipoproblema');

tipoProblemaCtrl.createTipoProblema=async(req,res)=>{
    try{
    const tipoProblema = new TipoProblema({
        nombre:req.body.nombre,
        status:'Activo'
    });
    await tipoProblema.save();
    res.status(200).json({message:"Tipo de problema guardado!"})
}catch(err){
    res.status(400).json({error:"Ha habido un problema al guardar el tipo de problema :( ",err:err})
}
}

tipoProblemaCtrl.updateTipoProblema=async()=>{
    try {
        const {_id}=req.params;
        const tipoProblema=req.body;
        await TipoProblema.findByIdAndUpdate(_id,{$set:tipoProblema},{$new:true});
        res.status(200).json({message:"Tipo de problema actualizada!"})
    } catch (err) {
            res.status(400).json({error:"Ha habido un problema al actualizar el tipo de problema :(", err:err})
    }
}
tipoProblemaCtrl.deleteTipoProblema=async(req,res)=>{
    try {
        const {_id}=req.params;
        await TipoProblema.findByIdAndDelete(_id);
        res.status(200).json({message:"Tipo Problema eliminado con exito!"})
        
    } catch (err) {
        res.status(400).json({error:"Ha habido un problema al eliminar el Tipo de Problema", err:err})
    }
}
tipoProblemaCtrl.getTipoProblema=async(req,res)=>{
    try { 
        const {_id}=req.params;
        const tipoProblema= await TipoProblema.findById(_id);
        if(tipoProblema){
        res.status(200).json(tipoProblema);
        }else{
            res.status(400).json({error:"No se ha encontrado Tipo Problema"});
        }
    } catch (err) {
        res.status(400).json({error:"Ha habido un problema al obtener el Tipo de Problema", err:err})
    }
}
tipoProblemaCtrl.getTipoProblemas=async(req,res)=>{
    try {
        const {status}=req.params;
        var tipoProblemas;
        if(status){
           tipoProblemas= await TipoProblema.find({status:status});
        }else{
            tipoProblemas=await TipoProblema.find();
        }
        if(tipoProblemas.length>0){
        res.status(200).json(tipoProblemas);
        }else{
            res.status(400).json({error:"No se han encontrado Tipos de Problema"})
        }
    } catch (err) {
        res.status(400).json({error:"Ha habido un problema al obtener el Tipo de Problema", err:err})
    }
}
module.exports=tipoProblemaCtrl;