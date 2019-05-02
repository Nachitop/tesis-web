const mongoose=require('mongoose');
const {Schema}=mongoose;

const FacultadSchema= new Schema({
    nombre:{type:String,required:true},
    director:{type:String,required:true},
    status:{type:String,required:true},
});
module.exports=mongoose.model('Facultad',FacultadSchema,);