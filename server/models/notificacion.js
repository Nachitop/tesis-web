const mongoose= require('mongoose');
const {Schema}= mongoose;

const NotificacionSchema= new Schema({
    usuario:{type:Schema.Types.ObjectId,ref:'Usuario',required:true},
    status:{type:String,required:true},
    fecha:{type:String,required:true}
});

module.exports= mongoose.model('Notificacion',NotificacionSchema);