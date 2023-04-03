const Transfers = require('../models/transfers.modal');
const User = require('../models/user.model');

exports.transfer = async (req, res, next) => {
  try {
    const { amount, senderUserId, receiverUserId } = req.body;

    const userReceiver = await User.findOne({
      where: {
        accountNumber: receiverUserId,
      },
    });

    const userTransfer = await User.findOne({
      where: {
        accountNumber: senderUserId,
      },
    });

    if (!userReceiver) {
      return res.status(400).json({
        status: 'error',
        message: `accountNumber no existe`,
      });
    }

    if (amount > userTransfer.amount) {
      return res.status(404).json({
        status: 'error',
        message: `monto de dinero no es suficiente`,
      });
    }

    if (userReceiver.accountNumber === userTransfer.accountNumber) {
      return res.status(404).json({
        status: 'error',
        message: `id son iguales`,
      });
    }

    await userReceiver.update(
      { amount: userReceiver.amount + amount },
      { where: { id: userReceiver.id } }
    );

    await User.update(
      { amount: userTransfer.amount - amount },
      { where: { id: userTransfer.id } }
    );

    await Transfers.create({ amount, senderUserId, receiverUserId });

    res.status(201).json({
      status: 'success',
      message: 'the user has ben created succesfully!',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
    });
  }
};
