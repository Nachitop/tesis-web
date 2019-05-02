const carreraCtrl={};
const Carrera=require('../models/carrera');


carreraCtrl.createCarrera=async(req,res)=>{
 
    try{
        const carrera= req.body;
        const carrera2= new Carrera({
            nombre: carrera.nombre,
            facultad: carrera.facultad,
            status: 'Activa'
        });
        await carrera2.save();
        res.status(200).json({message:'Carrera Guardada!'});
    }catch(err){
        res.status(400).json({error:'Algo anda mal al crear la carrera!',err:err});
    }
}

carreraCtrl.updateCarrera=async(req,res)=>{
   
    try{
        const {_id}=req.params;
        const carrera= req.body;
        await Carrera.findByIdAndUpdate(_id,{$set:carrera},{$new:true});
        res.status(200).json({message:'Carrera actualizaada!'});
    }catch(err){
        res.status(400).json({error:'Algo anda mal al actualizar la carrera!',err:err});
    }
}

carreraCtrl.deleteCarrera=async(req,res)=>{
    
    try{
        const {_id}=req.params;
        await Carrera.findByIdAndDelete(_id);
        res.status(200).json({message:'Carrera eliminada!'});
    }catch(err){
        res.status(400).json({error:'Algo anda mal al eliminar la carrera!',err:err});
    }
}

carreraCtrl.getCarrera=async(req,res)=>{
    try{
        const {_id}=req.params;
        const carrera= await Carrera.findById(_id);
      
        if(carrera && carrera!=null){
            res.status(200).json(carrera);
        }
        else{
            res.status(400).json({error:'No se ha encontrado la carrera'});
        }
    }catch(err){
        res.status(400).json({error:'Algo anda mal al obtener la carrera!',err:err});
    }
}

carreraCtrl.getCarreras=async(req,res)=>{
    try{
        const {status}=req.params;
        const {facultad}=req.params;
        var carreras;
        if(status && facultad){
          carreras= await Carrera.find({status:status, facultad:facultad}). populate('facultad');
      
        }
        else{
            if(status){
                carreras= await Carrera.find({status:status}).populate('facultad');
            }
            else{
                carreras= await Carrera.find().populate('facultad');
              
            }
           
        }
    
        if(carreras.length>0){
            res.status(200).json(carreras);
        }else{
            res.status(400).json({error:'No se han encontrado carreras'});
        }
    }catch(err){
        res.status(400).json({error:'Algo anda mal al obtener las carreras!',err:err});
    }

 

  
}



module.exports=carreraCtrl;