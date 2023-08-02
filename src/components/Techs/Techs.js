import s from "./Techs.module.css";

export default function Techs() {
  return (
    <div className={s.techs__background}>
      <div className={s.techs__container}>
        <h2 className={s.techs__title}>Технологии</h2>
        <p className={s.techs__subtitle}>7 технологий</p>
        <p className={s.techs__text}>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className={s.techs__list}>
          <li className={s.techs__item}>HTML</li>
          <li className={s.techs__item}>CSS</li>
          <li className={s.techs__item}>JS</li>
          <li className={s.techs__item}>React</li>
          <li className={s.techs__item}>Git</li>
          <li className={s.techs__item}>Express.js</li>
          <li className={s.techs__item}>mongoDB</li>
        </ul>
      </div>
    </div>
  );
}
