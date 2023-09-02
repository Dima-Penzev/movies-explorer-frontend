import "./AboutMe.css";
import student from "../../images/photo_student.jpg";
import { Link } from "react-router-dom";

export default function AboutMe() {
  return (
    <section className="student">
      <h2 className="student__title">Студент</h2>
      <div className="student__thumb">
        <img className="student__photo" src={student} alt="фото студента" />
      </div>
      <div className="student__content">
        <p className="student__name">Дмитрий</p>
        <p className="student__prof">Фронтенд-разработчик, 35 лет</p>
        <p className="student__summary">
          Я родился и живу в Ставрополе, закончил инженерно-строительный
          факультет СевКавГТУ. Я люблю слушать музыку, а ещё занимаюсь
          восстановлением старых вещей. Недавно начал кодить. Я стремлюсь к
          постоянному самосовершенствованию и следую за последними тенденциями в
          мире front-end разработки.
        </p>
        <Link className="student__github" to="https://github.com/Dima-Penzev" target="_blank">
          Github
        </Link>
      </div>
    </section>
  );
}
