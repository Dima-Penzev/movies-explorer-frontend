import { Link } from "react-router-dom";
import Header from "../Header/Header";
import s from "./Profile.module.css";
import Navigation from "../Navigation/Navigation";

export default function Profile() {
  return (
    <div className={s.profile}>
      <Header>
        <Navigation />
      </Header>
      <h2 className={s.profile__title}>Привет, Дмитрий!</h2>
      <form id="profile" className={s.profile__form}>
        <label className={s.profile__label}>
          Имя
          <input className={s.profile__input} type="text" name="username" />
          <span>Дмитрий</span>
        </label>
        <label className={s.profile__label}>
          E-mail
          <input className={s.profile__input} type="email" name="email" />
          <span>pochta@yandex.ru</span>
        </label>
      </form>
      <div className={s.profile__container}>
        <div className={s.profile__invisible}>
          <p className={s.profile__error}>
            При обновлении профиля произошла ошибка.
          </p>
          <button className={s.profile__btnSave} form="profile" type="submit">
            Сохранить
          </button>
        </div>
        <div>
          <button className={s.profile__edit} type="button">
            Редактировать
          </button>
          <Link className={s.profile__exit} to="/signin">
            Выйти из аккаунта
          </Link>
        </div>
      </div>
    </div>
  );
}
