import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../images/logo.svg";
import "../Register/Register.css";

export default function Login({ onLogin }) {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  useEffect(() => {
    setFormEmail("");
    setFormPassword("");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case "email":
        setFormEmail(value);
        break;

      case "password":
        setFormPassword(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formEmail, formPassword);
  };

  return (
    <div className="entry">
      <Link className="entry__logo-link" to="/">
        <img className="entry__logo" src={logo} alt="логотип" />
      </Link>
      <h2 className="entry__title">Рады видеть!</h2>
      <form className="entry__form" name="profile-data" onSubmit={handleSubmit}>
        <div>
          <label className="entry__label">
            E-mail
            <input
              className="entry__input"
              placeholder="E-mail"
              type="email"
              name="email"
              required
              value={formEmail}
              onChange={handleChange}
            />
            <span className="entry__error">Что-то пошло не так...</span>
          </label>
          <label className="entry__label">
            Пароль
            <input
              className="entry__input"
              placeholder="Пароль"
              type="password"
              name="password"
              minLength="8"
              required
              value={formPassword}
              onChange={handleChange}
            />
            <span className="entry__error">Что-то пошло не так...</span>
          </label>
        </div>
        <button type="submit" className="entry__button">
          Войти
        </button>
      </form>
      <p className="entry__text">
        Ещё не зарегистрированы?{" "}
        <Link className="entry__link" to="/signup">
          Регистрация
        </Link>
      </p>
    </div>
  );
}
