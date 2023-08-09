import s from "../Movies/Movies.module.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function SavedMovies() {
  return (
    <div className={s.movies}>
      <div className={s.movies__content}>
        <Header>
          <Navigation />
        </Header>
        <SearchForm />
      </div>
      <MoviesCardList />
      <Footer />
    </div>
  );
}
