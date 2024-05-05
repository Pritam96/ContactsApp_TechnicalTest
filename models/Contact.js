const mongoose = require("mongoose");
const ContactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    emailId: {
      type: String,
      required: [true, "Please add a email id"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email id",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please add a phone number"],
      unique: true,
      trim: true,
      maxlength: [20, "Phone number can not be longer than 20 characters"],
    },
    postalAddress: {
      type: String,
      trim: true,
      maxlength: [500, "Postal address can not be more than 500 characters"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", ContactSchema);
