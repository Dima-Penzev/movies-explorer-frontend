import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import "./Profile.css";
import Navigation from "../Navigation/Navigation";
import Preloader from "../Preloader/Preloader";

export default function Profile({ onUpdateUser, status, onLogout }) {
  const { name, email } = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: name,
      email,
    },
  });
  const [showEditor, setShowEditor] = useState(false);
  const [dataMatch, setDataMatch] = useState(false);
  const usernameInputValue = watch("username");
  const emailInputValue = watch("email");

  const handleFormSubmit = ({ username, email }) => {
    onUpdateUser(username, email);
  };

  const handleLogout = () => {
    onLogout();
  };

  useEffect(() => {
    setDataMatch(
      name === usernameInputValue && email === emailInputValue ? true : false
    );
  }, [name, email, usernameInputValue, emailInputValue]);

  useEffect(() => {
    if (status === "resolved") {
      setShowEditor(false);
    }
  }, [status]);

  return (
    <div className="profile">
      <header>
        <Header>
          <Navigation />
        </Header>
      </header>
      <h2 className="profile__title">Привет, {name}!</h2>
      <form
        id="profile"
        className="profile__form"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <label className="profile__label">
          Имя
          <input
            className={`profile__input ${!showEditor && "profile__invisible"}`}
            placeholder="Имя"
            type="text"
            {...register("username", {
              required: "Заполните поле Имя",
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
            {...register("email", {
              required: "Заполните поле E-mail",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                message:
                  "Email должен содержать символы: '@' и '.' Пример: 'xxx@xxx.xxx'",
              },
            })}
          />
          <span className={`${showEditor && "profile__invisible"}`}>
            {email}
          </span>
        </label>
        {errors.username && (
          <p className="profile__error">{errors.username.message}</p>
        )}
        {errors.email && (
          <p className="profile__error">{errors.email.message}</p>
        )}
      </form>
      <div className="profile__preloader">
        {status === "pending" && <Preloader />}
      </div>
      <div className="profile__container">
        <div
          className={`profile__update ${!showEditor && "profile__invisible"}`}
        >
          {status === "regected" && (
            <p className="profile__error">
              При обновлении профиля произошла ошибка.
            </p>
          )}
          <button
            className={`profile__btn-save ${
              (!isValid || dataMatch) && "profile__button_disabled"
            }`}
            disabled={!isValid || dataMatch}
            form="profile"
            type="submit"
          >
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
          <Link className="profile__exit" onClick={handleLogout}>
            Выйти из аккаунта
          </Link>
        </div>
      </div>
    </div>
  );
}
