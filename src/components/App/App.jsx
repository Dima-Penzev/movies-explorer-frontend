import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import UnknownPath from "../UnknownPath/UnknownPath";
import Profile from "../Profile/Profile";
import "./App.css";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/MainApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  notifyCommonError,
  notifyConflictError,
  notifyUnauthorizedError,
  notifyUpdataed,
} from "../../notifications/notifications";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [serverError, setServerError] = useState(null);
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();

  useEffect(() => {
    auth
      .getContent()
      .then((res) => {
        if (res) {
          setCurrentUser({ name: res.data.name, email: res.data.email });
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        setServerError(err);
        if (err === "Ошибка: 409") {
          notifyConflictError();
        } else {
          notifyCommonError();
          console.log(err);
        }
      });
  }

  function handleLogin(userEmail, userPassword) {
    auth
      .login(userEmail, userPassword)
      .then((res) => {
        setCurrentUser({ name: res.data.name, email: res.data.email });
        setLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setServerError(err);
        if (err === "Ошибка: 401") {
          notifyUnauthorizedError();
        } else {
          notifyCommonError();
          console.log(err);
        }
      });
  }

  function handelUpdateUserData(userName, userEmail) {
    setStatus("pending");

    auth
      .updateUserData(userName, userEmail)
      .then((res) => {
        setStatus("resolved");
        setCurrentUser({ name: res.data.name, email: res.data.email });
        notifyUpdataed();
      })
      .catch((err) => {
        setStatus("rejected");
        console.log(err);
      });
  }

  function handleLogout() {
    setStatus("pending");

    auth
      .logout()
      .then(() => {
        setStatus("resolved");
        setLoggedIn(false);
        localStorage.removeItem("movies-list");
        localStorage.removeItem("movie-query");
        localStorage.removeItem("short-movie-checked");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setStatus("rejected");
        console.log(err);
      });
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/signup"
            element={
              <Register onRegister={handleRegister} serverError={serverError} />
            }
          />
          <Route
            path="/signin"
            element={<Login onLogin={handleLogin} serverError={serverError} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                element={Profile}
                loggedIn={loggedIn}
                onUpdateUser={handelUpdateUserData}
                status={status}
                onLogout={handleLogout}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement element={Movies} loggedIn={loggedIn} />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                loggedIn={loggedIn}
              />
            }
          />
          <Route path="/*" element={<UnknownPath />} />
        </Routes>
      </CurrentUserContext.Provider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
