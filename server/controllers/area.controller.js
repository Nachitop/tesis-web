const areaCtrl={};
const Area=require("../models/area");

areaCtrl.createArea=async(req,res)=>{
    try {
        const area= new Area({
            nombre:req.body.nombre,
            facultad:req.body.facultad._id
        });
        await area.save();
        res.status(200).json({message:"Área guardada!"});
    } catch (err) {
        res.status(400).json({error:"Hubo problemas al guardar el área :(",err:err})
    }

}

areaCtrl.getAreas=async(req,res)=>{
    try {
     
            const areas=await Area.find();
      
    
        res.status(200).json(areas);
    } catch (err) {
        res.status(400).json({error:"Hubo problemas al recuperar las áreas :(",err:err})
    }
}
module.exports=areaCtrl;