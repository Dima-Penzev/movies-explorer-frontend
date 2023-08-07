import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import s from "./Movies.module.css";

export default function Movies() {
  return (
    <div className={s.movies}>
      <div className={s.movies__content}>
        <Header>
          <Navigation />
        </Header>
        <SearchForm />
      </div>
      <Footer />
    </div>
  );
}
