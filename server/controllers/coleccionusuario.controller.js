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
        res.status(400).json({error:'Algo anda mal al crear colección de usuario!',err:err});
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
        res.status(400).json({error:'Algo anda mal al obtener al usuario de la colección',err:err});
    }
}
module.exports=coleccionCtrl;