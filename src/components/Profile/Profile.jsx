import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import "./Profile.css";
import Navigation from "../Navigation/Navigation";
// import Preloader from "../Preloader/Preloader";

export default function Profile({ onUpdateUser }) {
  const { name, email } = useContext(CurrentUserContext);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    setFormName(name);
    setFormEmail(email);
  }, [name, email]);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case "username":
        setFormName(value);
        break;

      case "email":
        setFormEmail(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(formName, formEmail);
  };

  return (
    <div className="profile">
      <header>
        <Header>
          <Navigation />
        </Header>
      </header>
      <h2 className="profile__title">Привет, {name}!</h2>
      <form id="profile" className="profile__form" onSubmit={handleSubmit}>
        <label className="profile__label">
          Имя
          <input
            className={`profile__input ${!showEditor && "profile__invisible"}`}
            placeholder="Имя"
            type="text"
            name="username"
            minLength="2"
            maxLength="30"
            value={formName}
            onChange={handleChange}
          />
          <span className={`${showEditor && "profile__invisible"}`}>
            {name}
          </span>
        </label>
        <label className="profile__label">
          E-mail
          <input
            className={`profile__input ${!showEditor && "profile__invisible"}`}
            placeholder="E-mail"
            type="email"
            name="email"
            value={formEmail}
            onChange={handleChange}
          />
          <span className={`${showEditor && "profile__invisible"}`}>
            {email}
          </span>
        </label>
      </form>
      {/* <Preloader /> */}
      <div className="profile__container">
        <div className={`${!showEditor && "profile__invisible"}`}>
          <p className="profile__error">
            При обновлении профиля произошла ошибка.
          </p>
          <button className="profile__btn-save" form="profile" type="submit">
            Сохранить
          </button>
        </div>
        <div className={`${showEditor && "profile__invisible"}`}>
          <button
            className="profile__edit"
            type="button"
            onClick={() => {
              setShowEditor(true);
            }}
          >
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
