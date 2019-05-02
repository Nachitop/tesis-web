const mongoose=require('mongoose');
const {Schema}=mongoose;

const TipoProblemaSchema= new Schema({
    nombre:{type:String,required:true},
    status:{type:String,required:true}
});
module.exports=mongoose.model('TipoProblema',TipoProblemaSchema);