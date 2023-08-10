import MoviesCard from "../MoviesCard/MoviesCard";
import s from "./MoviesCardList.module.css";
import pic_1 from "../../temporaryImages/pic_1.jpg";
import pic_2 from "../../temporaryImages/pic_2.jpg";
import pic_3 from "../../temporaryImages/pic_3.jpg";
import pic_4 from "../../temporaryImages/pic_4.jpg";
import pic_5 from "../../temporaryImages/pic_5.jpg";

export default function MoviesCardList() {
  return (
    <ul className={s.moviesCardList}>
      <MoviesCard image={pic_1} />
      <MoviesCard image={pic_2} />
      <MoviesCard image={pic_3} />
      <MoviesCard image={pic_4} />
      <MoviesCard image={pic_5} />
    </ul>
  );
}
