require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const app = express();
const { errorHandler } = require('./errors/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });

    await app.listen(PORT, () => {
      console.log(`Сервер запущен на localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

app.use(
  cors({
    origin: [
      'http://movies.tptechnician.nomoredomains.icu',
      'https://movies.tptechnician.nomoredomains.icu',
      'http://localhost:3001',
      'http://localhost:3000',
    ],
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use(require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
