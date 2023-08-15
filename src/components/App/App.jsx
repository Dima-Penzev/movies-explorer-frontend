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
import * as auth from "../../utils/MainApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    auth
      .getContent()
      .then((res) => {
        if (res) {
          console.log(res);
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
      .then((res) => {
        navigate("/signin", { replace: true });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(userEmail, userPassword) {
    auth
      .login(userEmail, userPassword)
      .then((res) => {
        setLoggedIn(true);
        console.log(res);
        navigate("/movies", { replace: true });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/signup"
          element={<Register onRegister={handleRegister} />}
        />
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement element={Profile} loggedIn={loggedIn} />
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
            <ProtectedRouteElement element={SavedMovies} loggedIn={loggedIn} />
          }
        />
        <Route path="/*" element={<UnknownPath />} />
      </Routes>
    </div>
  );
}

export default App;
