const User = require('./../models/userModels');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to get users!',
    });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to create user!',
    });
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to update user!',
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body);

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to update user!',
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);

    res.status(204).json({
      status: 'success',
      message: 'User Deleted successfully!',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to delete users!',
    });
  }
};
