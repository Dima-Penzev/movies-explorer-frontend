import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css";
import Navigation from "../Navigation/Navigation";

export default function Profile() {
  return (
    <div className="profile">
      <header>
        <Header>
          <Navigation />
        </Header>
      </header>
      <h2 className="profile__title">Привет, Дмитрий!</h2>
      <form id="profile" className="profile__form">
        <label className="profile__label">
          Имя
          <input className="profile__input profile__invisible" placeholder="Имя" type="text" name="username" minLength="2" maxLength="30"/>
          <span>Дмитрий</span>
        </label>
        <label className="profile__label">
          E-mail
          <input className="profile__input profile__invisible" placeholder="E-mail" type="email" name="email" />
          <span>pochta@yandex.ru</span>
        </label>
      </form>
      <div className="profile__container">
        <div className="profile__invisible">
          <p className="profile__error">
            При обновлении профиля произошла ошибка.
          </p>
          <button className="profile__btn-save" form="profile" type="submit">
            Сохранить
          </button>
        </div>
        <div>
          <button className="profile__edit" type="button">
            Редактировать
          </button>
          <Link className="profile__exit" to="/signin">
            Выйти из аккаунта
          </Link>
        </div>
      </div>
    </div>
  );
}
