import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import logo from "../../images/logo.svg";
import "./Register.css";

export default function Register({ onRegister, serverError, status }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const handleFormSubmit = ({ username, email, password }) => {
    console.log("push");
    onRegister(username, email, password);
  };

  useEffect(() => {
    if (!serverError) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverError]);

  return (
    <div className="entry">
      <Link className="entry__logo-link" to="/">
        <img className="entry__logo" src={logo} alt="логотип" />
      </Link>
      <h2 className="entry__title">Добро пожаловать!</h2>
      <form
        className="entry__form"
        name="profile-data"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div>
          <label className="entry__label">
            Имя
            <input
              className="entry__input"
              placeholder="Имя"
              type="text"
              {...register("username", {
                required: "Заполните это поле",
                minLength: {
                  value: 2,
                  message: "Имя должно быть не менее 2 символов",
                },
                maxLength: {
                  value: 30,
                  message: "Имя должно быть не более 30 символов",
                },
                pattern: {
                  value: /^[A-Za-zА-Яа-я/ /-]+$/i,
                  message:
                    "Имя должно содержать только латиницу, кириллицу, пробел или дефис",
                },
              })}
            />
            <span className="entry__error">{errors.username?.message}</span>
          </label>
          <label className="entry__label">
            E-mail
            <input
              className="entry__input"
              placeholder="E-mail"
              type="email"
              {...register("email", {
                required: "Заполните это поле",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  message:
                    "Email должен содержать символы: '@' и '.' Пример: 'xxx@xxx.xxx'",
                },
              })}
            />
            <span className="entry__error">{errors.email?.message}</span>
          </label>
          <label className="entry__label">
            Пароль
            <input
              className="entry__input"
              placeholder="Пароль"
              type="password"
              {...register("password", {
                required: "Заполните это поле",
                minLength: {
                  value: 8,
                  message: "Пароль должен быть не менее 8 символов",
                },
              })}
            />
            <span className="entry__error">{errors.password?.message}</span>
          </label>
        </div>
        <div>
          {serverError && <p className="entry__server-error">{serverError}</p>}
          <button
            type="submit"
            className={`entry__button ${!isValid && "entry__button_disabled"}`}
            disabled={!isValid || status === "pending"}
          >
            Зарегистрироваться
          </button>
        </div>
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
