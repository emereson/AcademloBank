const User = require('../models/user.model');

exports.signup = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    const user = await User.create({
      name,
      password,
    });

    res.status(201).json({
      status: 'success',
      message: 'the user has ben created succesfully!',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { accountNumber, password } = req.body;

    const user = await User.findOne({
      where: {
        accountNumber,
        password,
        status: 'active',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `Invalid password or account number`,
      });
    }

    res.status(201).json({
      status: 'success',
      message: 'login succesfully! 👍',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
    });
  }
};
