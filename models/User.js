const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  isVoted :{
    type : Boolean,
    default : false
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type : String,
    enum: ["voter", "admin"], 
    default: "voter" 
    },
});

module.exports = mongoose.model("User", UserSchema);
