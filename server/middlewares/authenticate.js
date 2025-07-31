const { BadRequestError, UnauthorizedError } = require("../errors");
const jwt = require('jsonwebtoken');
const User = require("../models/User");

//This middleware fn is not getting executed
const authenticationMiddleware = async(req,res,next) =>{
const auth = req.headers.authorization;
if(!auth || !auth.startsWith("Bearer ")){
    throw new UnauthorizedError("Token Not Provided")
}

const token = auth.split(" ")[1]
try{
//verify token
const userPayload = jwt.verify(token,process.env.JWT_SECRET)
if(!userPayload){
    throw new UnauthorizedError("Invalid Token Provided")
}
req.user = userPayload
next()
}
catch(err){
    throw new UnauthorizedError("Authorization Failed")
}
}

module.exports = authenticationMiddleware