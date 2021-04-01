const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('./../models/userModels');

const signJWTToken = async (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

exports.signup = async (req, res, next) => {
  try {
    // Data: email, password create user in DB
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    // generate token for the user
    const token = await signJWTToken(user._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Unable to signup the user.',
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return next(new Error('Please provide a valid email and password'));
    }

    // Check if user exists and password is correct

    const user = await User.findOne({ email }).select('+password');

    if (!user && !(await user.correctPassword(password, user.password))) {
      return next(new Error('Incorrect email or password!'));
    }

    // send token to client
    const token = await signJWTToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'failed to login user.',
    });
  }
};

exports.protect = async (req, res, next) => {
  // Get the token and see if it exists
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new Error('You are not logged in, please log in to get access.')
    );
  }

  // verify token
  const verified = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user still exists
  const user = await User.findById(verified.id);

  if (!user) {
    return next(
      new Error('The user belonging to the token, no longer exists.')
    );
  }

  // Check if password changed after the token was issued
  if (user.passwordModified(verified.iat))
    next(
      new Error(
        'Password has been modified and is no longer valid, please login again'
      )
    );
  req.user = user;
  next();
};
