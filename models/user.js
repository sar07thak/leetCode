const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 8,
  },
  lastName: { 
    type: String,
    minLength: 3,
    maxLength: 8,
  },
  password: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    immutable: true, 
  },
  age: {
    type: Number,
    min: 5,  
    max: 80,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  problemSolved: [String],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
