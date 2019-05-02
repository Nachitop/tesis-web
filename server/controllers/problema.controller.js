const problemaCtrl={};
const Problema=require('../models/problema');
const Usuario=require('../models/usuario');
const Facultad=require('../models/facultad');
const fs=require('fs');
const util= require('util');
const unlinkasync= util.promisify(fs.unlink);

problemaCtrl.createProblema=async(req,res)=>{
    try {
        const problema=req.body;
     
        const problema2= new Problema({
            titulo: problema.titulo,
            descripcion: problema.descripcion,
            usuario:problema.usuario,
            imagen:problema.imagen,
            anonimo: problema.anonimo,
            fecha: new Date().toDateString(),
            status:'Pendiente',
            etiquetas:{
                facultad: problema.etiquetas.facultad,
                tipo_problema:problema.etiquetas.tipo_problema,
                area:problema.etiquetas.area,
                personalizada: problema.etiquetas.personalizada
            },
           
            
        })
       
       
         await problema2.save();
         res.status(200).json({message:"Problema reportado con exito!"});
    } catch (err) {
        console.log(err);
        res.status(400).json({error:"Algo salió mal al reportar el problema :(", err:err})
    }
}

problemaCtrl.editarProblema=async(req,res)=>{
    try {

        await Problema.findByIdAndUpdate(req.params._id,{$set:req.body},{$new:true});
        res.status(200).json({message:"Problema actualizado"});
        
    } catch (error) {
        res.status(400).json({error:"Algo salió mal al actualizar el problema :(", err:error})
    }
}

problemaCtrl.getProblemas=async(req,res)=>{
    try {
        const usuario= req.query.user;
        const status=req.query.status;
        const mine=req.query.mine;
        const interest=req.query.interest;
        const idP= req.query.idP;
        const statusWeb=req.query.statusWeb;
        


         const user= await Usuario.findById(usuario).populate('carrera','facultad');
         const lugar=user.carrera.facultad;  
         var options={};
         options['titulo']=1;
         options['descripcion']=1;
         options['imagen']=1;
         options['etiquetas']=1;
         options['votos']=1;
         options['status']=1;

        var problemas=[];
        var lugarWeb = new Facultad();






        if(user.facultad!=''){
            lugarWeb= await Facultad.findOne({nombre:user.facultad});
        }
    
         

        if(status){
            if(status!='All'){
                problemas=await Problema.find({_id: {$nin:idP} ,status:status, 'etiquetas.facultad':lugar},options).populate('etiquetas.facultad','nombre').populate('etiquetas.tipo_problema','nombre')
                .populate('etiquetas.area','nombre').sort({fecha:-1}).limit(3);
            }else{
                problemas=await Problema.find({_id: {$nin:idP}},options).populate('etiquetas.facultad','nombre').populate('etiquetas.tipo_problema','nombre')
                .populate('etiquetas.area','nombre').sort({fecha:-11}).limit(3);
             
            }
       
       
        }

        if(statusWeb){
            options['usuario']=1;
            options['fecha']=1;
            options['anonimo']=1;
            options['status']=1;
            //options['descripcion']=0;
            //options.descripcion=0;
            problemas=await Problema.find({_id: {$nin:idP},status:statusWeb,'etiquetas.facultad':lugarWeb._id},options).populate('etiquetas.facultad','nombre').populate('etiquetas.tipo_problema','nombre')
                .populate('etiquetas.area','nombre').populate('usuario').sort({votos:1});
            problemas.sort(function(a,b){
                return b.votos.length - a.votos.length
            });
           
        }

        if(mine){
            problemas= await Problema.find({_id: {$nin:idP},usuario:user._id}).populate('etiquetas.facultad','nombre').populate('etiquetas.tipo_problema','nombre')
            .populate('etiquetas.area','nombre').sort({fecha:-1}).limit(3);
        }
        if(interest){
            problemas= await Problema.find({_id: {$nin:idP},'votos.usuario':user._id}).populate('etiquetas.facultad','nombre').populate('etiquetas.tipo_problema','nombre')
            .populate('etiquetas.area','nombre').sort({'votos.fecha':-1}).limit(3);
        }
        console.log(problemas);
        res.status(200).json(problemas);
        
    } catch (err) {
        res.status(400).json({error:"Algo salió mal al recuperar los problemas :(", err:err}) 
    }
}



problemaCtrl.subirFoto= async(req,res)=>{
    try {
        const file = await req.file;
        if(file){
            res.status(200).json(file.path);
        }
        else{
            res.status(400).json({error:"Error al subir la imagen: revisa tu conexión a internet, porblemas en el servidor o imagen muy pesada"})
        }

    } catch (err) {
        res.status(400).json({error:"Problemas al subir la imagen :(", err:err})
    }
}

problemaCtrl.etiquetasPersonalizadas=async(req,res)=>{
    try{
        const {facultad}=req.params;
        const {area}=req.params;
        const {tipoproblema}=req.params;
        
        
        var array=[];
        const etiquetasPersonalizadas= await Problema.find({'etiquetas.facultad':facultad,'etiquetas.area':area,'etiquetas.tipo_problema':tipoproblema}).select({'etiquetas.personalizada':1,'_id':0});
        etiquetasPersonalizadas.map((etiqueta)=>{
            //coloconado las etiquetas en array
            array.push(etiqueta.etiquetas.personalizada)
        });
      
        //Eliminar elementos repetidos en array
        var etiquetas=[];
        array.filter(function(elem, index, self) {
        
            if(index===self.indexOf(elem)){
                var a={
                    etiqueta:'',
                    contador:0
                }
                
                 a.etiqueta= elem;
                 a.contador=self.filter(function(x){return x===elem}).length;
                 etiquetas.push(a);
            }
           
            //return index === self.indexOf(elem);
        });
    
        etiquetas.sort((a,b)=>a.contador.localCompare(b.contador));
        console.log(etiquetas)
        res.json(etiquetas);
    }catch(err){
        res.status(400).json({error:"Hubo problemas al recuperar las etiquetas :(", err:err})
    }
}

problemaCtrl.votarProblema=async(req,res)=>{
    try {
        const _idProblema= req.body._idProblema;
        const _idUser=req.body._idUser;
        const problema= await Problema.findById(_idProblema);
        
        function votar(){
            problema.votos.push({
                usuario: _idUser,
                fecha: new Date().toDateString()
            });
            res.status(200).json({message:"Has votado el problema"});
        }

        if(problema.votos.length>0){
            var voto;


            problema.votos.filter(function(v,index){
              
                if(v.usuario==_idUser){
                  
                    voto=v;
                }
            });
         
            if(voto){
                problema.votos= problema.votos.filter(v=>v.usuario!=voto.usuario)
                res.status(200).json({message:"Has desvotado el problema"});
             }
             else{
                 votar();
             }
        }else{
            votar();
        }
       
       await problema.save();
       
        
    } catch (error) {
        res.status(400).json({error:"Hubo problemas al votar", err:error})
    }
}

problemaCtrl.getProblema=async(req,res)=>{
    try {
        const {_id}= req.params;
        const problema= await Problema.findById(_id).populate('etiquetas.facultad','nombre').populate('etiquetas.tipo_problema','nombre')
        .populate('etiquetas.area','nombre').populate('usuario');
        if(problema){
            res.status(200).json(problema);
        }else{
            res.status(400).json({error:"No se ha encontrado el problema"})
        }
        
    } catch (error) {
        res.status(400).json({error:"Hubo problemas al recuperar el problema", err:error})
    }
}

problemaCtrl.deleteProblema= async(req,res)=>{
    try {
        
        const problemaEliminado=await Problema.findByIdAndDelete(req.params._id);
        await unlinkasync(problemaEliminado.imagen);
        res.status(200).json({message:'Problema eliminado con exito'});
    } catch (error) {
        res.status(400).json({error:"Hubo problemas al eliminar el problema", err:error})
    }
}

problemaCtrl.solucionar=async(req,res)=>{
    try {

        const problema= await Problema.findById(req.body._id);
        problema.solucion.nota=req.body.solucion.nota;
        problema.solucion.monto=req.body.solucion.monto;
        problema.solucion.fecha=req.body.solucion.fecha;
        problema.status="Solucionado";
        problema.save();
        res.status(200).json({message:"Problema solucionado"});
        
    } catch (error) {
        res.status(400).json({error:"Hubo problemas al solucionar el problema", err:error})
    }
}

module.exports=problemaCtrl;