const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

const userRoutes = require("./routes/user");
const logger = require("./middleware/logger");

app.use(express.json());

mongoose
  .connect("mongodb+srv://kunal98v:Kunal1234$@mr47.9zgc8xn.mongodb.net/")
  .then(() => console.log("MongoDB Connected !"))
  .catch((err) => console.log("Error", err));

app.listen(PORT, () => {
  console.log(`Server Running or port : ${PORT}`);
});

app.use(logger)

app.use("/user", userRoutes)

