const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Kindly provide an username"],
    unique: true,
    maxlength: 20,
    minlength:3,
  },
  email: {
    type: String,
    required: [true, "Kindly provide an email"],
    unique: true,
    maxlength: 30,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, "Kindly provide a password to secure your profile"],
    minlength: 5
  },
  dp:{
    type:String,
    required:[true,"Please provide a Profile Picture"]
  }
}, { timestamps: true });

// Mongoose middleware for hashing password
UserSchema.pre('save',async function(){
const salt = 10;
this.password =  await bcrypt.hash(this.password,salt)
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
