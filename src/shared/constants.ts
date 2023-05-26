export const ErrorMessages = {
  Card: {
    NOT_FOUND: 'Запрашиваемая карточка не найдена',
    DELETE: 'Можно удалять только собственные посты',
  },
  User: {
    NOT_FOUND: 'Запрашиваемый пользователь не найден',
    CONFLICT: 'Пользователь с таким email уже существует',
  },
  Auth: {
    DEFAULT: 'Ошибка авторизации',
    WRONG_CREDENTIALS: 'Неверные имя пользователя или пароль',
  },
  Routes: {
    NOT_FOUND: 'Ресурс не найден. Проверьте URL и метод запроса',
  },
  SERVER_ERROR: 'На сервере произошла ошибка',
};
export const ValidationMessages = {
  EMAIL: 'Введен некорректный email',
  URL: 'Некорректный URL',
};
export const DefaultUser = {
  NAME: 'Жак-Ив Кусто',
  ABOUT: 'Исследователь',
  AVATAR: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
};
