const regexUrl = /https?:\/\/[www.]*[\w-]+\.[a-z]+[\/\w\S]*/;

const messages = {
  //cardError: 'Карточка не найдена',
  userError: 'Запрашиваемый пользователь не найден',
  //commonError: { message: 'Произошла ошибка' },
  badRequest: 'Переданы некорректные данные',
  //pageNotFound: 'Страница не найдена',
  //incorrectEmail: 'Неправильный формат почты',
  //server: 'На сервере произошла ошибка',
  emailError: 'Указанный email уже занят',
  //forbidden: 'Действие запрещено',
  //unauthorized: 'Необходима авторизация',
  emailOrPasswordErr: 'Неправильные почта или пароль',
};

const resCodes = {
  OK_CODE: 200,
  CREATED_CODE: 201,
  NOT_FOUND_ERROR: 404,
  //INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST_ERROR: 400,
  CONFLICT_ERROR: 409,
  //FORBIDDEN: 403,
  UNAUTHORIZED_ERROR: 401,
};

module.exports = {
  regexUrl,
  messages,
  resCodes,
};
