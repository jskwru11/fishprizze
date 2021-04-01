const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fishRouter = require('./routes/fishRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());
const mode = process.env.NODE_ENV;

// Development logging of each api call
if (mode === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/fish', fishRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`));
});

module.exports = app;
