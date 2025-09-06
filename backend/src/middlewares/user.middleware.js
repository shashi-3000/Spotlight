// import jwt from "jsonwebtoken";
// import { ApiError } from "../utils/ApiError.js";
// import { User } from "../models/user.models.js";

// export const verifyJWT = async (req, res, next) => {
//   try {
//     // 1️⃣ get token from cookies
//     // const token = req.cookies?.accessToken;
//     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       throw new ApiError(401, "Unauthorized: No access token provided");
//     }

//     // 2️⃣ verify token
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     // 3️⃣ attach user to request
//     const user = await User.findById(decoded._id).select("-password -refreshToken");
//     if (!user) {
//       throw new ApiError(401, "Unauthorized: Invalid token user");
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     next(new ApiError(401, error?.message || "Unauthorized"));
//   }
// };


import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"; 

export const verifyJWT= asyncHandler(async(req,res,next)=>{

    try {
        const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError(401,"Unauthorised request")
        }
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET) // decoding the token
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
        req.user=user
        next()

    } 
    catch (error) {
        throw new ApiError(401,"Invalid Access Token")
    }

})