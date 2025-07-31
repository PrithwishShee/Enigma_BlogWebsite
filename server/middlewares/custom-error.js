const { StatusCodes } = require("http-status-codes")
const CustomErrorClass = require("../errors/CustomError")

const customErrorHandler = (err,req,res,next) =>{
    if( err instanceof CustomErrorClass){
        return res.status(err.statusCode).json({message:err.message})
    }
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:err})
}

module.exports = customErrorHandler