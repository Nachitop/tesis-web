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


notificacionCtrl.get=async(req,res)=>{
    try {

        const {facultad}= req.params;
        const fechaHoy=new Date().toDateString();
 
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
             problemas= await Problema.find({fecha: fechaHoy}, options).populate(population['population1']).populate(population['population2']).populate(population['population3']);
             correrAlgoritmo(problemas,facultad);

        }else{
            const fac= await Facultad.findOne({nombre:facultad});
            problemas = await Problema.find({'etiquetas.facultad':fac._id, fecha: fechaHoy },options).populate(population['population1']).populate(population['population2']).populate(population['population3']);
            correrAlgoritmo(problemas,fac.nombre);
        }


        function correrAlgoritmo(problemas,facultad){
              
            crearArchivo(problemas, facultad );
         
        }

        function leerArchivo(nombreArchivo){
                  //Se lee el archivo de manera asyncrona
                  var result;
                  var apriori;
                  var transactions=[];
               var readStream= fs.createReadStream(carpeta+nombreArchivo)
                      .pipe(csv_parse())
                      .on('data',(row)=>{
                          transactions.push(row);
                         
                      }).on('end',async()=>{
                           apriori= await new Apriori.Algorithm(0.8,0.9);
                           result=  await apriori.analyze(transactions);
                         
                          readStream.destroy();
                          
                    
                        
                    
                      }).on('close',async()=>{
               
                          await unlinkasync(carpeta+nombreArchivo);
                          res.status(200).json(result.associationRules);
                      });
        }

         function crearArchivo(problemas,nombreArchivo){
            try {
                var nombreArchivoCsv=nombreArchivo+".csv";
                var dataCSV=[];
        
            problemas.forEach(problema => {
        
                var rowCSV={
                    facultad:'',
                    area:'',
                    tipo_problema: '',
                    personalizada: '',
                }
        
                rowCSV.facultad= problema.etiquetas.facultad.nombre;
                rowCSV.area= problema.etiquetas.area.nombre;
                rowCSV.tipo_problema= problema.etiquetas.tipo_problema.nombre;
                rowCSV.personalizada= problema.etiquetas.personalizada
                dataCSV.push(rowCSV);
            });
        
           
           
            const ws = fs.createWriteStream(carpeta+nombreArchivoCsv);  
            fastcsv.write(dataCSV, { headers: false }).pipe(ws).on('finish',()=>{
                leerArchivo(nombreArchivoCsv);
               
             });
        
            } catch (error) {
                return error;
            }
        }
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al recuperar las notificaciones', error:error})
    }

}





module.exports=notificacionCtrl;