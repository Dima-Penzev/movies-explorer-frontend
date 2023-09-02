import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import pic_1 from "../../images/temporaryImages/pic_1.jpg";
import pic_2 from "../../images/temporaryImages/pic_2.jpg";
import pic_3 from "../../images/temporaryImages/pic_3.jpg";
import pic_4 from "../../images/temporaryImages/pic_4.jpg";
import pic_5 from "../../images/temporaryImages/pic_5.jpg";

export default function MoviesCardList() {
  return (
      <ul className="movies-card-list">
        <MoviesCard image={pic_1} />
        <MoviesCard image={pic_2} />
        <MoviesCard image={pic_3} />
        <MoviesCard image={pic_4} />
        <MoviesCard image={pic_5} />
      </ul>
  );
}
