const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// @desc User signup
// @route POST api/users/signup
// @access Public
const userSignup = asyncHandler(async (req,res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const existingUser = await User.findOne({ email });
    if(existingUser){
        res.status(400);
        throw new Error("User already exists!");
    }

    const user = await User.create({
        name,
        email,
        password,  
    });

    res.status(201).json({
        message: "User Creater", 
        user: {
            id: user._id,
            name: user.name,
            email: user.email,

        }
    });
});

// @desc User login
// @route POST api/users/login
// @access Public
const userLogin = asyncHandler(async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({email});
    if(user && await user.comparePassword(password)){
        const token = jwt.sign(
            {id: user._id},
            process.env.SECRET_KEY,
            {expiresIn: "40m"},
        );

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } else{
        res.status(401);
        throw new Error("Invalid Credentials");
    }
});

module.exports = {userSignup, userLogin};