const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your email ID"],
        unique: [true, "This email Id already exists"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password needs to be atleast 6 characters long"]
    }
}, {timestamps: true});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

userSchema.methods.comparePass = async function(recievedPass){
    return await bcrypt.compare(recievedPass,this.password);
};

const User = mongoose.model("User",userSchema);
module.exports = User;