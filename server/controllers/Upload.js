const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const cloudinary = require('cloudinary').v2
const fs = require('fs');
const { log } = require("console");

const profilePictureUpload = async (req, res) => {
    //Getting hold of the image
    const { dp } = req.files;
    //performing checks
    if (!dp) {
        throw new BadRequestError("Please provide a profile picture")
    }
    if (!dp.mimetype.startsWith('image')) {
        throw new BadRequestError("Only images are allowed")
    }
    const uploadResult = await cloudinary.uploader.upload(dp.tempFilePath, {
        use_filename: true,
        folder: 'ExpressImageUpload'
    })
    fs.rmSync(dp.tempFilePath)
    res.status(StatusCodes.OK).json({ success: true, imagePath: uploadResult.secure_url })
}

const blogImageUpload = async (req, res) => {
    const { image } = req.files;
    if (!image) {
        throw new BadRequestError("Please provide an image relevant the blog.")
    }
    if (!image.mimetype.startsWith("image")) {
        throw new BadRequestError("Only images are allowed!")
    }
    const uploadResult = await cloudinary.uploader.upload(image.tempFilePath, {
        use_filename: true, folder: 'ExpressImageUpload/BlogImages'
    })
    fs.rmSync(image.tempFilePath)
    res.status(StatusCodes.OK).json({ success: true, imagePath: uploadResult.secure_url })
}

module.exports = { profilePictureUpload, blogImageUpload }