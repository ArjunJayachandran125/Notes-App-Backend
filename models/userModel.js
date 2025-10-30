const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your Name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email ID"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: true,
    },
}, {timestamps: true});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function(recievedPass){
    return await bcrypt.compare(recievedPass, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;