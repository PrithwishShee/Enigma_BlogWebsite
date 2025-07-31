const { StatusCodes } = require("http-status-codes")
const User = require("../models/User")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { NotFoundError, UnauthorizedError } = require("../errors")

const registerUser =async (req,res)=>{
    console.log(req.body);
    const {username,email,dp} = req.body
    const user = new User({...req.body})
    await user.save()

const token = jwt.sign({id:user._id,username,email,dp},process.env.JWT_SECRET,{expiresIn:'2d'}   )
 
res.status(StatusCodes.CREATED).json({success:true,createdUser:user,token})

}

const loginUser = async(req,res)=>{
const {username,password,email} = req.body;
console.log(req.body);
const user = await User.findOne({username,email})
if(!user){
    throw new NotFoundError("Invalid login credentials ")
}

const match = await bcrypt.compare(password,user.password)

if(!match){
    throw new UnauthorizedError("Invalid password")
}


const token = jwt.sign({id:user._id,username,email,dp:user.dp},process.env.JWT_SECRET,{expiresIn:'2d'})
res.status(StatusCodes.OK).json({success:true,user,token})
}

module.exports = {registerUser,loginUser}

