import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section id="about-project" className="about">
      <h2 className="about__title">О проекте</h2>
      <div className="about__content">
        <div className="about__inner">
          <p className="about__subtitle">Дипломный проект включал 5 этапов</p>
          <p className="about__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div>
          <p className="about__subtitle">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="about__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__table">
        <p className="about__one">1 неделя</p>
        <p className="about__four">4 недели</p>
        <p className="about__area">Back-end</p>
        <p className="about__area">Front-end</p>
      </div>
    </section>
  );
}
