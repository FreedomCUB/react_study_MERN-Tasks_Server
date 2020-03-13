const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors');

// create server
const app = express();

// connect Data Base
connectDB();

// use cors
app.use(cors());

// expres.json
app.use( express.json({ extended: true}) );

// Impor routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))



// app port
const port = process.env.port || 4000;

// app start
app.listen(port, '0.0.0.0' , () => {
    console.log(`App funcionando en el puerto ${PORT}`);
})