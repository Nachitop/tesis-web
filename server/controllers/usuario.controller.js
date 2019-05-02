const usuarioCtrl={};
const Usuario=require('../models/usuario');
const bcrypt=require('bcrypt');
const Carrera=require('../models/carrera');

usuarioCtrl.createUsuario=async(req,res)=>{
    try{
        const usuario=req.body;
        console.log(usuario)
        const carrera= await Carrera.findOne({nombre:usuario.carrera.nombre}).populate({path:'facultad',match:{nombre:usuario.carrera.facultad.nombre}});
        console.log(carrera);
        const usuario2= new Usuario({
            matricula: usuario.matricula,
            email: usuario.email,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            carrera: carrera._id,
            tipo: usuario.tipo,
            status: 'Activo',
            fecha_registro: new Date(),
            password:  bcrypt.hashSync(usuario.password,10)
    
        });
        await usuario2.save();
        res.status(200).json({message:'Usuario creado con exito! En proceso de activación de la cuenta'});

    }catch(err){
        res.status(400).json({error:'Algo salió mal al crear el usuario',err:err});
        
    }
}

usuarioCtrl.updateUsuario=async(req,res)=>{
    try{
        const {_id}=req.params;
        const usuario=req.body;
        await Usuario.findByIdAndUpdate(_id,{$set:usuario},{$new:true})
        res.status(200).json({message:'Usuario actualizado correctamente'});
    }catch(err){
        res.status(400).json({error:'Algo salió mal al actualizar el usuario',err:err});
    }
}

async function buscarUsuario(usuario){

    const user= await Usuario.findOne({$or:[{matricula:usuario},{email:usuario}]})
 
        return user;
}

usuarioCtrl.login=async(req,res)=>{
   
    try {
        const usuario=req.body.matricula;
        const password=req.body.password;
     
         buscarUsuario(usuario).then((usuario)=>{
           const user=usuario;
            if(user){
               if(user.status=='Activo'){
                 bcrypt.compare(password,user.password, function(err,result){
                     if(result==true){   
                         res.status(200).json(user);
                     }else{
                       
                         res.status(400).json({error:'Contraseña incorrecta'});
                     }
     
                 });
                }else{
                    res.status(400).json({error:'Tu cuenta no está activada, en proceso de activación o puede asistir a la administración de su facultad'});
                }
            }else{
                res.status(400).json({error:'Usuario no encontrado'});
            }

         });
         
       
    } catch (err) {
        res.status(400).json({error:'Algo salió mal al iniciar sesión', err:err})
    }
}

usuarioCtrl.getUsuario=async(req,res)=>{
    try{
      const user= buscarUsuario(req.body.usuario);
      if(!user){
        res.status(200).json({exists:1});
      }
      else{
        res.status(400).json({exists:0});
      }
     
    }catch(err){
        res.status(400).json({error:'Algo salió mal al recuperar el usuario', err:err})
    }
}

usuarioCtrl.getUsuarios=async(req,res)=>{
    try {
        const {status}=req.params;
        const {facultad}=req.params;
   
        if(status && facultad){
            const usuarios= await Usuario.find({status:status,facultad:facultad});
            if(usuarios.length>0){
                res.status(200).json(usuarios);
            }
            else{
                res.status(400).json({error:'No se han encontrado usuarios', err:err})
            }
           
        }
       
    } catch (err) {
        res.status(400).json({error:'Algo salió mal al recuperar los usuarios', err:err})
    }
}


usuarioCtrl.validarMatricula=async(req,res)=>{
    try {
        const {matricula}=req.params;
        var exists=0;
        const usuario= await Usuario.findOne({matricula:matricula});
       
        if(usuario){
         
            exists=1
        }
        else{
            exists=0;
        }
        res.status(200).json(exists);
    } catch (err) {
        res.status(400).json({error:'Algo salió mal al validar la matricula', err:err})
    }
}
usuarioCtrl.validarEmail=async(req,res)=>{
    try {
        const {email}=req.params;
        var exists=0;
        const usuario= await Usuario.findOne({email:email});
        if(usuario){
            exists=1
        }
        else{
            exists=0;
        }
        res.status(200).json(exists);
    } catch (err) {
        res.status(400).json({error:'Algo salió mal al validar el email', err:err})
    }
}

module.exports=usuarioCtrl;