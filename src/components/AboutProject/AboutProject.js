import s from "./AboutProject.module.css";

export default function AboutProject() {
  return (
    <div id="about-project" className={s.about}>
      <h2 className={s.about__title}>О проекте</h2>
      <div className={s.about__content}>
        <div className={s.about__inner}>
          <p className={s.about__subtitle}>Дипломный проект включал 5 этапов</p>
          <p className={s.about__text}>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div>
          <p className={s.about__subtitle}>
            На выполнение диплома ушло 5 недель
          </p>
          <p className={s.about__text}>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className={s.about__table}>
        <p className={s.about__one}>1 неделя</p>
        <p className={s.about__four}>4 недели</p>
        <p className={s.about__area}>Back-end</p>
        <p className={s.about__area}>Front-end</p>
      </div>
    </div>
  );
}
