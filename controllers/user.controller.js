const User = require('../models/user.model');

exports.findAll = async (req, res, next) => {
  const user = await User.findAll({
    where: {},
  });
  res.status(200).json({
    status: 'active',
    message: `all users `,
    results: user.length,
    user,
  });
};

exports.findOne = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `user whit id:${id}  not found`,
    });
  }
  res.status(201).json({
    status: 'success',
    message: 'the query has been done successfully',
    user,
  });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, password } = req.body;

  const user = await User.findOne({
    where: {
      status: 'active',
      id: id,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `user whit id:${id}  not found`,
    });
  }
  await user.update({ name, password });

  res.status(201).json({
    status: 'success',
    message: `user data has been updated successfully`,
    user,
  });
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const user = await User.findOne({
    where: {
      id: id,
      status: 'active',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `user whit id:${id}  not found`,
    });
  }

  await user.update({ status });

  return res.status(201).json({
    status: 'success',
    message: `user has been deactivated successfully`,
    user,
  });
};
