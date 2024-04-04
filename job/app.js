require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { limiter } = require('./middlewares/limiter');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_URL_DEV } = require('./utils/config');

const { PORT = 5000, MONGO_URL = MONGO_URL_DEV } = process.env;
const app = express();

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log('Connected to bank');

  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();

app.use(cors());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
// Допустим, ваш файл находится в папке files и его имя - filename.pdf

// Обработчик запроса на загрузку файла
app.get('/files/:filename', (req, res) => {
  // Получаем имя файла из параметров запроса
  const filename = req.params.filename;
  // Путь к вашему файлу
  const filePath = path.join(__dirname, 'files', filename);

  // Проверяем существование файла
  fs.exists(filePath, (exists) => {
    if (exists) {
      // Отправляем файл обратно клиенту
      res.sendFile(filePath);
    } else {
      // Если файл не найден, отправляем ответ с ошибкой
      res.status(404).send('Файл не найден');
    }
  });
});

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  console.error(err);
  handleError(err, res, next);
});
