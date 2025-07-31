const User = require('../models/User');
const Post = require('../models/Post');
const { NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const getUserPosts = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("User Not Found");
  }

  const posts = await Post.find({ author: user._id });

  if (posts.length === 0) {
    return res.status(StatusCodes.OK).json({
      posts: [],
      message: `${user.username} is yet to make a post.`,
    });
  }

  res.status(StatusCodes.OK).json({ success: true, posts });
});

const getUserDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    throw new NotFoundError("User Not Found!");
  }

  res.status(StatusCodes.OK).json({ user });
});

module.exports = { getUserDetails, getUserPosts };
