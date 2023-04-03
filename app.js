const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRoute = require('./routes/user.route');
const transfersRoute = require('./routes/transfers.route');
const authRouter = require('./routes/auth.route');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors());

app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/transfers', transfersRoute);

module.exports = app;
