const express=require('express');
const app= express();
const cors=require('cors')
const {mongoose}=require('./database');
//settings
app.set('port', process.env.PORT||3000);

//Imagenes


//middlewares
app.use('/uploads',express.static('uploads'))
app.use(express.json());
app.use(cors())
//routes
app.use('/api/facultad',require('./routes/facultad.route'))
app.use('/api/carrera',require('./routes/carrera.route'));
app.use('/api/usuario',require('./routes/usuario.route'));
app.use('/api/tipoproblema',require('./routes/tipoproblema.route'));
app.use('/api/coleccion',require('./routes/coleccionusuario.route'));
app.use('/api/area',require('./routes/area.route'));
app.use('/api/problema',require('./routes/problema.route'));
app.use('/api/apf',require('./routes/AreaPorFacultad.route'));
app.use('/api/notificacion', require('./routes/notificacion.route'));
//Startin' server
app.listen(app.get('port'),()=>{
    console.log("server on port",app.get('port'));
});