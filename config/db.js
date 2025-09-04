const mongoose = require("mongoose");
require("dotenv").config()

const connectDB = async = () => {
  mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(() => console.log("MongoDB Connected !"))
    .catch((err) => console.log("Error", err));
};

module.exports = connectDB