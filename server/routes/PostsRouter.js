const express = require('express');
const {  createPost, deletePost, updatePost,  } = require('../controllers/Posts');
const { blogImageUpload } = require('../controllers/Upload');

const PostsRouter = express.Router()

// PostsRouter.route("/").get(getPosts).post(createPost);
PostsRouter.route("/").post(createPost);
PostsRouter.route("/upload").post(blogImageUpload)
PostsRouter.route("/:id").patch(updatePost).delete(deletePost);

module.exports = PostsRouter