const mongoose=require('mongoose');
const {Schema}=mongoose;

const CarreraSchema= new Schema({
    nombre:{type:String,required:true},
    facultad:{type:Schema.Types.ObjectId,ref:'Facultad'},
    status:{type:String,required:true}
});
module.exports=mongoose.model('Carrera',CarreraSchema);