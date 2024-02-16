import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function(next) {
    const user = this;
    if (!user.isModified("password")) return next();
    const hashedPasword = await bcrypt.hash(user.password, 10);
    user.password = hashedPasword;
    next();
});

const User = mongoose.model("User", userSchema);

export default User;
