import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, require: true, minLength: 3, maxLength: 60 },
  last_name: { type: String, require: true, minLength: 3, maxLength: 60 },
  email: { type: String, require: true, unique: true, index: true },
  age: { type: Number, require: true, min: 18, max: 100 },
  password: { type: String, require: true },
  role: { type: String, default: 'user'  },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts", default: [] },
  isGithub: { type: Boolean, required: true, default: false },
  isGoogle: { type: Boolean, required: true, default: false },
  recover_password: {
    id_url: {type: String},
    createTime: {type: String}
  }
});

export const userModel = mongoose.model("Users", userSchema);
