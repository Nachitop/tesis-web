const mongoose=require('mongoose');
const URI='mongodb://nacho:admin123@ds123625.mlab.com:23625/tesis';
//const URI='mongodb://localhost/tesis_webest05';
mongoose.connect(URI,{ useNewUrlParser: true })
    .then(db=> console.log('Db is connected'))
    .catch(err=> console.error(err));
module.exports=mongoose;