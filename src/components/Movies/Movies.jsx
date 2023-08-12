import AddMoreBtn from "../AddMoreBtn/AddMoreBtn";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

export default function Movies() {
  return (
    <div className="movies">
      <header className="movies__header">
        <Header>
          <Navigation />
        </Header>
      </header>
      <main className="movies__container">
        <SearchForm />
        <MoviesCardList />
        <AddMoreBtn />
      </main>
      <Footer />
    </div>
  );
}
