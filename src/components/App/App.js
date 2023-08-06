import Main from "../Main/Main";
import Register from "../Register/Register";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import UnknownPath from "../UnknownPath/UnknownPath";
import Profile from "../Profile/Profile";
import s from "./App.module.css";

function App() {
  return (
    <div className={s.root}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<UnknownPath />} />
      </Routes>
    </div>
  );
}

export default App;
