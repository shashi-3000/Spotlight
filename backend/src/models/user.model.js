// import mongoose , {Schema} from "mongoose";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    likedMovies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
    savedMovies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
    refreshToken: {
      type: String, // 👈 added this
    },
  },
  { timestamps: true }
);


//BCRYPT PART
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // skip if unchanged
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔑 Compare entered password with hashed one
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};


//TOKENS PART - ACCESS AND REFRESH
userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {   
            _id:this._id,
            email:this.email,
            username:this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {   
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema);





// const User = mongoose.model("User", userSchema);
// export default User;
