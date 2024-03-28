// routes/index.js
const router = require('express').Router();
const { registerValidator, authValidator } = require('../middlewares/validation');
const { createUser, login, getAnketa, updateAnketa } = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const NotFoundError = require('../errors/NotFoundError');
const { PAGE_NOT_FOUND } = require('../utils/constants');

router.post('/signup', registerValidator, createUser);
router.post('/signin', authValidator, login);

router.use(auth);

router.use('/users', usersRouter);

router.get('/anketa', getAnketa);
router.post('/anketa', updateAnketa);

router.use((req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND));
});

module.exports = router;
