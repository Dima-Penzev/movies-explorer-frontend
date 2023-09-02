import Main from "../Main/Main";
import Register from "../Register/Register";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import UnknownPath from "../UnknownPath/UnknownPath";
import Profile from "../Profile/Profile";
import "./App.css";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/*" element={<UnknownPath />} />
      </Routes>
    </div>
  );
}

export default App;
