import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import s from "../Register/Register.module.css";

export default function Login() {
  return (
    <div className={s.entry__container}>
      <img className={s.entry__logo} src={logo} alt="логотип" />
      <h2 className={s.entry__title}>Рады видеть!</h2>
      <form className={s.entry__form} name="profile-data">
        <div>
          <label className={s.entry__label}>
            E-mail
            <input className={s.entry__input} type="email" name="email" />
            <span className={s.entry__error}>Что-то пошло не так...</span>
          </label>
          <label className={s.entry__label}>
            Пароль
            <input className={s.entry__input} type="password" name="password" />
            <span className={s.entry__error}>Что-то пошло не так...</span>
          </label>
        </div>
        <button className={s.entry__button}>Войти</button>
      </form>
      <p className={s.entry__text}>
        Ещё не зарегистрированы?{" "}
        <Link className={s.entry__link} to="/signup">
          Регистрация
        </Link>
      </p>
    </div>
  );
}
