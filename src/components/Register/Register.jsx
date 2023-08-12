import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Register.css";

export default function Register() {
  return (
    <div className="entry">
      <Link className="entry__logo-link" to="/">
        <img className="entry__logo" src={logo} alt="логотип" />
      </Link>
      <h2 className="entry__title">Добро пожаловать!</h2>
      <form className="entry__form" name="profile-data">
        <div>
          <label className="entry__label">
            Имя
            <input className="entry__input" placeholder="Имя" type="text" name="username" minLength="2" maxLength="30" required />
            <span className="entry__error">Что-то пошло не так...</span>
          </label>
          <label className="entry__label">
            E-mail
            <input className="entry__input" placeholder="E-mail" type="email" name="email" required />
            <span className="entry__error">Что-то пошло не так...</span>
          </label>
          <label className="entry__label">
            Пароль
            <input className="entry__input" placeholder="Пароль" type="password" name="password" minLength="8" required />
            <span className="entry__error">Что-то пошло не так...</span>
          </label>
        </div>
        <Link className="entry__button" to="/signin">
          Зарегистрироваться
        </Link>
      </form>
      <p className="entry__text">
        Уже зарегестрированы?{" "}
        <Link className="entry__link" to="/signin">
          Войти
        </Link>
      </p>
    </div>
  );
}
