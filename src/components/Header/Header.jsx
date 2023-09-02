import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Header.css";

export default function Header({ children }) {
  return (
    <div className="header">
      <Link className="header__link" to="/">
        <img className="header__image" src={logo} alt="логотип" />
      </Link>
      {children}
    </div>
  );
}
