const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const profilePictureUpload = asyncHandler(async (req, res) => {
  if (!req.files || !req.files.dp) {
    throw new BadRequestError("Please provide a profile picture");
  }
  const dp = req.files.dp;
  if (!dp.mimetype.startsWith('image')) {
    throw new BadRequestError("Only images are allowed");
  }
  // Optionally validate size here

  const uploadResult = await cloudinary.uploader.upload(dp.tempFilePath, {
    use_filename: true,
    folder: 'ExpressImageUpload'
  });
  fs.rmSync(dp.tempFilePath, { force: true });

  res.status(StatusCodes.OK).json({ success: true, imagePath: uploadResult.secure_url });
});

const blogImageUpload = asyncHandler(async (req, res) => {
  if (!req.files || !req.files.image) {
    throw new BadRequestError("Please provide an image relevant to the blog.");
  }
  const image = req.files.image;
  if (!image.mimetype.startsWith("image")) {
    throw new BadRequestError("Only images are allowed!");
  }

  const uploadResult = await cloudinary.uploader.upload(image.tempFilePath, {
    use_filename: true,
    folder: 'ExpressImageUpload/BlogImages'
  });
  fs.rmSync(image.tempFilePath, { force: true });

  res.status(StatusCodes.OK).json({ success: true, imagePath: uploadResult.secure_url });
});

module.exports = { profilePictureUpload, blogImageUpload };
