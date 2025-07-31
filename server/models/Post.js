const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 100,
        required: [true, "Kindly provide a title for the blog"]
    },
    intro: {
        type: String,
        maxlength: 500,
        required: [true, "Please provide a brief summary of the blog"]
    },
    content: {
        type: String,
        maxlength: 50000,
        required: [true, "Kindly provide the content for the blog"]
    },
    imageURL: {
        type: String,
        required: [true, "Kindly provide an Image URL for the blog"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide author name"]
    },
    tags: {
        type: [String],
        required: [true, "Kindly provide some tags related to your blog"],
        maxlength: 15
    }
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
