import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({

  username: {
    type: String,
    required: [true, "Please provide a lastname for this user."],
    maxlength: [60, "Lastname cannot be more than 60 characters"],
   
  },
  email: {
    type: String,
    required: [true, "please provide a email"],
    unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "Please Provide Email",
    },
  },
  password: {
    type: String,
    required: [true, "Please choose a password"],
  },
});


export default mongoose.model("User", UserSchema);
