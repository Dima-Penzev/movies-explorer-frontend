import Main from "../Main/Main";
import Register from "../Register/Register";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import s from "./App.module.css";

function App() {
  return (
    <div className={s.root}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
