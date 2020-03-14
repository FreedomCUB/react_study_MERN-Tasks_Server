const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

// create server
const app = express();

// connect Data Base
connectDB();

// use cors
app.use(cors());

// expres.json
app.use(express.json({ extended: true }));

// app port
const port = process.env.PORT || 4000;

// Import routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tasks", require("./routes/tasks"));

// app start
app.listen(port, "0.0.0.0", () => {
  console.log(`Server funcionando en el puerto ${port}`);
});
