const mongoose = require('mongoose');
const User = require('../models/User');
const { NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const Post = require('../models/Post');

const getUserPosts = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        throw new NotFoundError("User Not Found")
    }
    const posts = await Post.find({ author: user._id })
    if (posts.length === 0) {
        return res.status(StatusCodes.OK).json({ posts: [], message: `${user.username} is yet to make a post.` })
    }
    res.status(StatusCodes.OK).json({ success: true, posts })
}

// controller to get user details
const getUserDetails = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const user = await User.findById(id)
    console.log(user);
    if(!user){
        throw new NotFoundError("User Not Found!")
    }
    res.status(StatusCodes.OK).json({user})
}

module.exports = { getUserDetails, getUserPosts }