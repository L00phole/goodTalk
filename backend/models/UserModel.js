import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a lastname for this user."],
    maxlength: [30, "Lastname cannot be more than 60 characters"],
    unique: true,
    validate: {
      validator: (value) => {
        // Ange anpassad valideringslogik här
        // Exempel: Använd ett reguljärt uttryck för att validera användarnamnet
        const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
        return usernameRegex.test(value);
      },
      message: "Invalid username",
    },
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
