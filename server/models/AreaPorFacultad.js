const mongoose= require("mongoose");
const {Schema}=mongoose;

const APFSchema= new Schema({
    facultad:{type:Schema.Types.ObjectId,ref:'Facultad'},
    areas:[
        {type:Schema.Types.ObjectId,ref:'Area'}
    ]
})

module.exports=mongoose.model("APF",APFSchema);