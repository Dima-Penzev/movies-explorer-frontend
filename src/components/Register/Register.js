import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import s from "./Register.module.css";

export default function Register() {
  return (
    <div className={s.entry}>
      <img className={s.entry__logo} src={logo} alt="логотип" />
      <h2 className={s.entry__title}>Добро пожаловать!</h2>
      <form className={s.entry__form} name="profile-data">
        <div>
          <label className={s.entry__label}>
            Имя
            <input className={s.entry__input} type="text" name="username" />
            <span className={s.entry__error}>Что-то пошло не так...</span>
          </label>
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
        <button className={s.entry__button}>Зарегистрироваться</button>
      </form>
      <p className={s.entry__text}>
        Уже зарегестрированы?{" "}
        <Link className={s.entry__link} to="/signin">
          Войти
        </Link>
      </p>
    </div>
  );
}
