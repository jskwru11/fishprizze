const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: `./config.env` });
const app = require('./app');

// const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);
const DB = process.env.DB_LOCAL;


mongoose
  .connect(DB, {
    useNewUrlParser: true,
    UseCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const PORT = process.env.PORT;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () =>
  console.log(`Server currently running on port ${PORT}...`)
);
