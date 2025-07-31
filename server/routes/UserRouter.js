const express = require('express')
const {getUserPosts,getUserDetails} = require('../controllers/User')
const UserRouter = express.Router()

UserRouter.get("/:id/posts",getUserPosts)
UserRouter.get("/:id",getUserDetails)


module.exports = UserRouter 

// /api/v1/profile/<id>