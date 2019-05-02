const mongoose=require('mongoose');
const {Schema}=mongoose;

const UsuarioSchema= new Schema({
    matricula:{type:String,required:true},
    email:{type:String,required:true},
    nombre:{type:String,required:true},
    apellido:{type:String,required:true},
    carrera:{type:Schema.Types.ObjectId,ref:'Carrera'},
    tipo:{type:String,required:true},
    password:{type:String,required:true},
    status:{type:String,required:true},
    fecha_registro:{type:Date,required:true},
    facultad:{type:String}
});
module.exports=mongoose.model('Usuario',UsuarioSchema);