const express = require("express");
const app = express();
require("dotenv").config()
const connectDB = require("./config/db")
const candidateRoutes = require("./routes/candidate");
const userRoutes = require("./routes/user")
const logger = require("./middleware/logger");

app.use(express.json());

connectDB()

const PORT = process.env.PORT || 3000

app.use(logger);
app.use("/candidate", candidateRoutes);
app.use("/user", userRoutes)

app.listen(PORT, () => {
  console.log(`Server Running or port : ${PORT}`);
});