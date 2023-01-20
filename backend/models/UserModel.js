const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userID: {
    type: mongoose.ObjectId,
  },
  firstName: {
    type: String,
    required: [true, "Please provide a firstname for this user."],
    maxlength: [60, " Firstname cannot be more than 60 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a lastname for this user."],
    maxlength: [60, "Lastname cannot be more than 60 characters"],
  },
  email: {
    type: String,
    required: [
      function () {
        let emailRegEx =
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return emailRegEx.test(this.email);
      },
      "Invalid email-address",
    ],
    unique: true,
    maxlength: [60, " Email cannot be more than 60 characters long"],
  },
  password: {
    type: String,
    required: [true, "Please choose a password"],
    maxlength: [30, " The password can't be more than 30 characters long"],
    minLength: [6, "The password must be at least 6 characters long"],
  },
  admin: Boolean,
});
module.exports = mongoose.model("User", UserSchema);
