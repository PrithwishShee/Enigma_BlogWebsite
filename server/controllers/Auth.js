const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { NotFoundError, UnauthorizedError } = require("../errors");

// Async handler DRY wrapper
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, dp, password } = req.body;
  // Mongoose will validate required fields; double-check here for custom errors if desired

  const user = new User({ username, email, dp, password });
  await user.save();

  const token = jwt.sign(
    { id: user._id, username, email, dp },
    process.env.JWT_SECRET,
    { expiresIn: '2d' }
  );

  res.status(StatusCodes.CREATED).json({ success: true, createdUser: user, token });
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  // Finds user where both username and email match.
  const user = await User.findOne({ username, email });
  if (!user) {
    throw new NotFoundError("Invalid login credentials");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new UnauthorizedError("Invalid password");
  }

  const token = jwt.sign(
    { id: user._id, username, email, dp: user.dp },
    process.env.JWT_SECRET,
    { expiresIn: '2d' }
  );

  res.status(StatusCodes.OK).json({ success: true, user, token });
});

module.exports = { registerUser, loginUser };
