const facultadCtrl={};
const Facultad=require('../models/facultad');

facultadCtrl.createFacultad=async(req,res)=>{
try{
    const facultad=req.body;
    const facultad2= new Facultad({
        nombre:facultad.nombre,
        director:facultad.director,
        status: 'Activa'
    });
    await facultad2.save();
    res.status(200).json({message:'Facultad Guardada!'});
}
catch(err){
    res.status(400).json({error:'Algo anda mal al crear la facultad!',err:err});
}
}

facultadCtrl.updateFacultad=async(req,res)=>{
    try{
        const {_id}=req.params;
        const facultad={
            nombre:req.body.nombre,
            director:req.body.director,
            status: req.body.status,
        }
        await Facultad.findByIdAndUpdate(_id,{$set:facultad},{$new:true});
        res.status(200).json({message:'Facultad Actualizada'});
    }
    catch(err){
        res.status(400).json({error:'Algo anda mal al actualizar la facultad!',err:err});
    }
}

facultadCtrl.deleteFacultad=async(req,res)=>{
    try{
        const {_id}=req.params;
        await Facultad.findByIdAndDelete(_id);
        res.status(200).json({message:'Facultad eliminada!'});
    }catch(err){
        res.status(400).json({error:'Algo anda mal al eliminar la facultad!',err:err});
    }
}

facultadCtrl.getFacultad=async(req,res)=>{
    try{
      const {_id}=req.params
      const facultad= await Facultad.findById(_id);
      if(facultad){
        res.status(200).json(facultad);
      }
      else{
          res.status(400).json({error:'No se ha encontrado la facultad'})
      }
    }catch(err){
        res.status(400).json({error:'Algo salió mal al recuperar la facultad',err:err});
    }
}

facultadCtrl.getFacultades=async(req,res)=>{
    try{
        const {status}=req.params;
        let facultades;
         if(status){
          
          facultades = await Facultad.find({status:status});
      
     
         }else{
            facultades.push(await Facultad.find());
         }
     if(facultades.length>0){
            res.status(200).json(facultades);
        }else{
            res.status(400).json({error:'No se han encontrado facultades'});
        }
    }catch(err){
        res.status(400).json({error:'Algo salió mal al recuperar las facultades!',err:err});
    }
}



module.exports=facultadCtrl;