import s from "./AboutMe.module.css";
import student from "../../images/photo_student.jpg";

export default function AboutMe() {
  return (
    <div className={s.student__container}>
      <h2 className={s.student__title}>Студент</h2>
      <div className={s.student__thumb}>
        <img className={s.student__photo} src={student} alt="фото студента" />
      </div>
      <div className={s.student__content}>
        <p className={s.student__name}>Дмитрий</p>
        <p className={s.student__prof}>Фронтенд-разработчик, 35 лет</p>
        <p className={s.student__summary}>
          Я родился и живу в Ставрополе, закончил инженерно-строительный
          факультет СевКавГТУ. Я люблю слушать музыку, а ещё занимаюсь
          восстановлением старых вещей. Недавно начал кодить. Я стремлюсь к
          постоянному самосовершенствованию и следую за последними тенденциями в
          мире front-end разработки.
        </p>
        <a className={s.student__github} href="https://github.com/Dima-Penzev">
          Github
        </a>
      </div>
    </div>
  );
}