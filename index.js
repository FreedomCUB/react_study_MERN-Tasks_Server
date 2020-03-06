const express = require('express');
const connectDB = require('./config/db')

// create server
const app = express();

// connect Data Base
connectDB();

// Impor routes
app.use('/api/users', require('./routes/users'))

// app port
const PORT = process.env.PORT || 4000;

// app start
app.listen(PORT, () => {
    console.log(`App funcionando en el puerto ${PORT}`);
})