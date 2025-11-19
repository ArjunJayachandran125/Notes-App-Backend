const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async(req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(401);
        throw new Error("Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");
    if(!req.user){
        res.status(401);
        throw new Error("Unauthorized user");
    }
    next();
});

module.exports = protect;