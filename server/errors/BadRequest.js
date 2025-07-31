const { StatusCodes } = require("http-status-codes");
const CustomErrorClass = require("./CustomError");

class BadRequestError extends CustomErrorClass{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError