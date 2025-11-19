const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { userRegistrationSchema, userLoginSchema } = require("../utils/validation");

// @desc User signup
// @route POST api/users/signup
// @access Public
const userSignup = asyncHandler(async(req,res) => {
    const { error, value } = userRegistrationSchema.validate(req.body);
    if(error){
        res.status(400);
        throw new Error(error.details[0].message);
    }
    const {name,email,password} = value;
    const existingUser = await User.findOne({email});
    if(existingUser){
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({
        name,
        email,
        password
    });
    res.status(201).json({
        message: "User has been created successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
});

// @desc User login
// @route POST api/users/login
// @access Public
const userLogin = asyncHandler(async(req,res) => {
    const { error, value } = userLoginSchema.validate(req.body);
    if(error){
        res.status(400);
        throw new Error(error.details[0].message);
    }
    const { email,password } = value;
    const user = await User.findOne({email});
    if(user && await user.comparePass(password)){
        const token = jwt.sign(
            {id: user._id},
            process.env.SECRET_KEY,
            {expiresIn: "60m"}
        );
        res.status(200).json({
            message: "Logged in successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } else {
        res.status(401);
        throw new Error("Invalid Credentials");
    }
});

module.exports = {userLogin, userSignup};