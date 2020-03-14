const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const connectDB = async () => {
  const URI= 'mongodb+srv://root:Cub1t4n40w@cluster0-mxgxf.mongodb.net/MERN-Tasks'
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB Conectada');
    } catch (error) {
        console.log('hubo un error')
        console.log(error);
        process.exit(1); // Detener la app
    }
}

module.exports = connectDB;