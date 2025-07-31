const express = require('express')
const { registerUser, loginUser } = require('../controllers/Auth')
const { profilePictureUpload } = require('../controllers/Upload')
const AuthRouter = express.Router()

AuthRouter.post("/register",registerUser)

AuthRouter.post("/login",loginUser)

AuthRouter.post("/register/upload",profilePictureUpload)

module.exports = AuthRouter