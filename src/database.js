const mongoose = require('mongoose');// Importa mongoose
const URI = 'mongodb+srv://manuel18:sNIdeJBJoOFbPCGP@users.ldxv8aw.mongodb.net/test';// Conexión a la base de datos


mongoose.connect(URI)// Conecta a la base de datos
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;// Exporta mongoose
