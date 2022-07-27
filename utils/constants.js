const regexUrl = /https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/;

const messages = {
  movieError: 'Фильм не найден',
  userError: 'Запрашиваемый пользователь не найден',
  badRequest: 'Переданы некорректные данные',
  pageNotFound: 'Страница не найдена',
  serverError: 'На сервере произошла ошибка',
  emailError: 'Указанный email уже занят',
  forbidden: 'Действие запрещено',
  unauthorized: 'Необходима авторизация',
  emailOrPasswordErr: 'Неправильные почта или пароль',
};

const resCodes = {
  OK_CODE: 200,
  CREATED_CODE: 201,
  NOT_FOUND_ERROR: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST_ERROR: 400,
  CONFLICT_ERROR: 409,
  FORBIDDEN_ERROR: 403,
  UNAUTHORIZED_ERROR: 401,
};

const allowedCors = [
  'https://fproject.students.nomoredomains.sbs',
  'http://fproject.students.nomoredomains.sbs',
  'http://localhost:3000',
  'https://localhost:3000',
  'https://api.fproject.students.nomoredomains.sbs',
  'http://api.fproject.students.nomoredomains.sbs',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  regexUrl,
  messages,
  resCodes,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
