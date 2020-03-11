const express = require('express');
const connectDB = require('./config/db')

// create server
const app = express();

// connect Data Base
connectDB();

// expres.json

app.use( express.json({ extended: true}) );

// Impor routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))



// app port
const PORT = process.env.PORT || 4000;

// app start
app.listen(PORT, () => {
    console.log(`App funcionando en el puerto ${PORT}`);
})