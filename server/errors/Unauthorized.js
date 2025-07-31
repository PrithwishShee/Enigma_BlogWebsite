const { StatusCodes } = require("http-status-codes");
const CustomErrorClass = require("./CustomError");

class UnauthorizedError extends CustomErrorClass{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthorizedError