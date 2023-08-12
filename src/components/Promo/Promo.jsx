import "./Promo.css";
import mainLogo from "../../images/main-img.png";
import Header from "../Header/Header";
import NavTab from "../NavTab/NavTab";

export default function Promo() {
  return (
    <header className="promo">
      <div className="promo__container">
        <Header>
          <NavTab />
        </Header>
        <div className="promo__content">
          <img
            className="promo__image"
            src={mainLogo}
            alt="главный логотип"
          />
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="promo__text">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a href="#about-project" className="promo__link">
            Узнать больше
          </a>
        </div>
      </div>
    </header>
  );
}
