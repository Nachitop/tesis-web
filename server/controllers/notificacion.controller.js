const notificacionCtrl={};
const Problema= require('../models/problema');
const Facultad= require('../models/facultad');
const fastcsv = require('fast-csv');
const csv_parse = require('csv-parse');   
const fs = require('fs');
var Apriori = require('apriori'); 
var carpeta="csvFiles/"; 
const util= require('util');
const unlinkasync= util.promisify(fs.unlink);
const hoy=new Date().toLocaleDateString().replace(/\//g,"-");

notificacionCtrl.get=async(req,res)=>{
    try {

        const {facultad}= req.params;

     
 
        var problemas=[];
        const options={};
        const population={};
        options['etiquetas']=1;

        population['population1']={
            path:'etiquetas.facultad',
            model: 'Facultad',
            select:{'nombre':1}

        };

        population['population2']={
            path:'etiquetas.tipo_problema',
            model:'TipoProblema',
            select:{'nombre':1}
        };

        population['population3']={
            path:'etiquetas.area',
            model:'Area',
            select:{'nombre':1}
        }



        if(facultad==='all'){
             problemas= await Problema.find({fecha: new Date(hoy), status:{$ne:'Solucionado'} } , options).populate(population['population1']).populate(population['population2']).populate(population['population3']);
             correrAlgoritmo(problemas,facultad);

        }else{
          
            const fac= await Facultad.findOne({nombre:facultad});
            problemas = await Problema.find({'etiquetas.facultad':fac._id, fecha: new Date(hoy), status:{$ne:'Solucionado'} },options).populate(population['population1']).populate(population['population2']).populate(population['population3']);
            correrAlgoritmo(problemas,fac.nombre);
        }


        function correrAlgoritmo(problemas,facultad){
         
           if(problemas.length>0){
                crearArchivo(problemas);
           }
           else{
               res.status(400).json({message:"No hay problemas para crear notificaciones"});
           }   
           
         
        }

        function leerArchivo(transactions){
               
                var result;
                var apriori;
             
                apriori=  new Apriori.Algorithm(0.15,0.6);
                result= apriori.analyze(transactions);
                res.status(200).json(result.associationRules);
            
        }

         function crearArchivo(problemas){
            try {
            var transactions=[];
          
            problemas.forEach(problema => {
                var row=[];
                row.push(problema.etiquetas.area.nombre); 
                row.push(problema.etiquetas.tipo_problema.nombre);
          
                transactions.push(row);
            });
            leerArchivo(transactions);
               
        
        
            } catch (error) {
                return error;
            }
        }
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al recuperar las notificaciones', error:error})
    }

}



//apis para conocer cuando mostrar las notificaciones en el administrador (vistos de notificaciones)

const Notificacion= require('../models/notificacion');

notificacionCtrl.create=async(req,res)=>{
    try {
        
        const notificacion= new Notificacion({
            usuario: req.body.usuario,
            status: 'visto',
            fecha: req.body.fecha
        });

        await notificacion.save();
        res.status(200).json({message:'Notificación status creada'});

    } catch (error) {
        res.status(400).json({message:'hubo problemas al modificar el status de las notificaciones', error:error});
    }
}

notificacionCtrl.getNotificacion=async(req,res)=>{
    try {


     
        var notificaciones=[];
         notificaciones= await Notificacion.find({usuario:req.params.usuario,fecha: req.params.fecha});
 
        if(notificaciones.length>0){
            res.status(400).json({message:"Notificaciones ya vistas"});
        }else{
            res.status(200).json({message:"Notificaciones no vistas"});
        }
        
    } catch (error) {
        res.status(400).json({message:'hubo problemas al obtener la última notificación', error:error});
    }
}





module.exports=notificacionCtrl;