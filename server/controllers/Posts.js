const { StatusCodes } = require("http-status-codes");
const Post = require("../models/Post");
const { NotFoundError } = require("../errors");

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const createPost = asyncHandler(async (req, res) => {
  const { title, intro, content, tags, image: imageURL } = req.body;
  const { user } = req;

  const post = new Post({ title, intro, content, tags, imageURL, author: user.id });
  await post.save();

  res.status(StatusCodes.CREATED).json({ success: true, post });
});

const updatePost = asyncHandler(async (req, res) => {
  const postID = req.params.id;
  const updatedPost = await Post.findByIdAndUpdate(postID, { ...req.body }, {
    new: true,
    runValidators: true
  });

  if (!updatedPost) {
    throw new NotFoundError("Post Not Found");
  }

  res.status(StatusCodes.OK).json({ success: true, updatedPost });
});

const deletePost = asyncHandler(async (req, res) => {
  const postID = req.params.id;
  const deletedPost = await Post.findByIdAndDelete(postID);

  if (!deletedPost) {
    throw new NotFoundError("Post Not Found");
  }

  res.status(StatusCodes.OK).json({ success: true, deletedPost });
});

module.exports = { createPost, updatePost, deletePost };
