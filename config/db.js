const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const connectDB = async () => {
  try {
      await mongoose.connect(process.env.DB_MONGO, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
          useFindAndModify: false

      });
      console.log('DB Connected')

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
