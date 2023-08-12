import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "../Register/Register.css";

export default function Login() {
  return (
    <div className="entry">
      <Link className="entry__logo-link" to="/">
        <img className="entry__logo" src={logo} alt="логотип" />
      </Link>
      <h2 className="entry__title">Рады видеть!</h2>
      <form className="entry__form" name="profile-data">
        <div>
          <label className='entry__label'>
            E-mail
            <input className="entry__input" placeholder="E-mail" type="email" name="email" required/>
            <span className="entry__error">Что-то пошло не так...</span>
          </label>
          <label className="entry__label">
            Пароль
            <input className="entry__input" placeholder="Пароль" type="password" name="password" minLength="8" required/>
            <span className="entry__error">Что-то пошло не так...</span>
          </label>
        </div>
        <Link className='entry__button' to="/movies">
          Войти
        </Link>
      </form>
      <p className='entry__text'>
        Ещё не зарегистрированы?{" "}
        <Link className='entry__link' to="/signup">
          Регистрация
        </Link>
      </p>
    </div>
  );
}
