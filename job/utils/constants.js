module.exports.NOT_FOUND_CODE = 404;
module.exports.BAD_REQUEST_CODE = 400;
module.exports.DEFAULT_ERROR_CODE = 500;
module.exports.AUTH_ERROR_CODE = 401;
module.exports.EMAIL_IS_TAKEN = 409;
module.exports.FORBIDDEN_ERROR_CODE = 403;

module.exports.REGEX = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

module.exports.JWT_SECRET_DEV = 'dev-secret';
module.exports.MONGO_URL_DEV = 'mongodb://localhost:27017/bank';

module.exports.BAD_EMAIL = 'Неправильный формат почты';
module.exports.BAD_EMAIL_OR_PASSWORD = 'Неправильный логин или пароль';
module.exports.BAD_URL = 'Неправильный формат URL';
module.exports.USER_NOT_FOUND = 'Указанный пользователь не найден';
module.exports.PAGE_NOT_FOUND = 'Указанная страница не найдена';
module.exports.VALIDATION_ERROR_MESSAGE = 'Переданы некорректные данные';
module.exports.CONFLICT_ERROR_MESSAGE = 'Пользователь с такой почтой уже зарегистрирован';
module.exports.AUTH_SUCCESSFUL = 'Авторизация прошла успешно';
module.exports.AUTH_ERROR_MESSAGE = 'Необходима авторизацияss';
