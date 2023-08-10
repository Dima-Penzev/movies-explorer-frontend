import s from "./Promo.module.css";
import mainLogo from "../../images/main-img.png";
import Header from "../Header/Header";
import NavTab from "../NavTab/NavTab";

export default function Promo() {
  return (
    <div className={s.promo}>
      <div className={s.promo__container}>
        <Header>
          <NavTab />
        </Header>
        <div className={s.promo__content}>
          <img
            className={s.promo__image}
            src={mainLogo}
            alt="главный логотип"
          />
          <h1 className={s.promo__title}>
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className={s.promo__text}>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a href="#about-project" className={s.promo__link}>
            Узнать больше
          </a>
        </div>
      </div>
    </div>
  );
}