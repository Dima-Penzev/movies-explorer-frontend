import s from "./Promo.module.css";
import mainLogo from "../../images/main-img.png";
import NavTab from "../NavTab/NavTab";

export default function Promo() {
  return (
    <div className={s.promo__container}>
      <NavTab />
      <div className={s.promo__content}>
        <img className={s.promo__image} src={mainLogo} alt="главный логотип" />
        <h1 className={s.promo__title}>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className={s.promo__text}>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button className={s.promo__button}>Узнать больше</button>
      </div>
    </div>
  );
}
