import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
    },
    OTP:{
      type: Number
    },
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
      return next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await (this.password, salt);
    next();
});

const User = mongoose.model("User", userSchema);

export default User;