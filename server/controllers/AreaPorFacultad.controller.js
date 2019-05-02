const APFCtrl={};
const APF=require("../models/AreaPorFacultad");

APFCtrl.create=async(req,res)=>{
    try {
        console.log(req.body);

        const apf= new APF({
            facultad: req.body.facultad,
            areas: req.body.areas
        });

        await apf.save();
        res.status(200).json({message:"Guardado con exito"});
        
    } catch (err) {
        res.status(400).json({error:"Hubo problemas al crear el documento",err:err})
    }
}

APFCtrl.getAPFbyF=async(req,res)=>{
    try {

        const {_idFacultad}=req.params;

   
            const apf= await APF.findOne({facultad:_idFacultad}).populate('areas');
        
   
        res.status(200).json(apf.areas);
        
    } catch (err) {
        res.status(400).json({error:"Hubo problemas al obtener el documento ",err:err})
    }
}

module.exports=APFCtrl;