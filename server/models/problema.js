const mongoose= require('mongoose');
const {Schema}= mongoose;

const ProblemaSchema= new Schema({
    titulo:{type:String,required:true},
    descripcion:{type:String,required:true},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario',required:true},
    imagen:{type:String,required:true},
    anonimo:{type:Boolean,required:true},
    fecha:{type:String,required:true},
    status:{type:String,required:true},
    etiquetas:{
        
        facultad:{type:Schema.Types.ObjectId,ref:'Facultad',required:true},
        tipo_problema:{type:Schema.Types.ObjectId,ref:'TipoProblema',required:true},
        area:{type:Schema.Types.ObjectId,ref:'Area',required:true},
        personalizada:{type:String,required:true},

    },
    votos:[{
        usuario: {type:Schema.Types.ObjectId,ref:'Usuario'},
        fecha:{type:Date}
    }
    ],
    solucion:{
        fecha:{type:Date},
        nota:{type:String},
        monto:{type:Number}
    }
      
        
    

});

module.exports=mongoose.model('Problema',ProblemaSchema);