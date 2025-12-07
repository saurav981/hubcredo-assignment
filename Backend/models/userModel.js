const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please use valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be greater then 8 characters"],
      select: false,
    },
  },
  { timestamps: true }
);

// Hide fields functions
const hideFields = (...fields) => {
  const transform = (_, ret) => {
    fields.forEach((field) => delete ret[field]);
    return ret;
  };
  ["toJSON", "toObject"].forEach((type) => userSchema.set(type, { transform }));
};
hideFields("__v", "password");

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
