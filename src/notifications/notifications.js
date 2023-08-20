import { toast } from "react-toastify";

export const notifyCommonError = () => {
  toast.error(
    "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
  );
};
export const notifyEmptyQuery = () =>
  toast.error("Нужно ввести ключевое слово");
export const notifyForbidenAction = () =>
  toast.error("Недостаточно прав для удаления фильма");
export const notifyUpdataed = () => {
  toast.success("Данные пользователя успешно изменены");
};
export const notifyConflictError = () =>
  toast.error("Пользователь с таким E-mail уже существует");
export const notifyUnauthorizedError = () =>
  toast.error("Не верно введены E-mail или пароль");
