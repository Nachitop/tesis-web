const coleccionCtrl={};
const Coleccion=require('../models/coleccionUsuarios');

coleccionCtrl.createUsuario=async(req,res)=>{
    try{
        const coleccion= new Coleccion({
            matricula:req.body.matricula,
            nombre:req.body.nombre,
            apellido:req.body.apellido,
            carrera:req.body.carrera,
            facultad:req.body.facultad,
            tipo:req.body.tipo
        });

        await coleccion.save();
        res.json("guardado");
    }catch(err){
        console.log(err)
    }
}

coleccionCtrl.getUsuario=async(req,res)=>{
    try{
        const {matricula}=req.params;
        const usuario= await Coleccion.findOne({matricula:matricula});
        if(usuario){
        res.json(usuario);
        }else{
            res.json(0);
        }
    }catch(err){
        console.log(err);
    }
}
module.exports=coleccionCtrl;