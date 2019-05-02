const mongoose=require('mongoose');
const {Schema}=mongoose;

const ColeccionUsuarioSchema= new Schema({
    matricula:{type:String,required:true},
    nombre:{type:String,required:true},
    apellido:{type:String,required:true},
    carrera:{type:String,required:true},
    facultad:{type:String,required:true},
    tipo:{type:String,required:true},
  
    
});
module.exports=mongoose.model('ColeccionUsuario',ColeccionUsuarioSchema);