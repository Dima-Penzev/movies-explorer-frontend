import "./AddMoreBtn.css";

export default function AddMoreBtn({ onAddMovies }) {
  return (
    <div className="add-more-btn">
      <button
        className="add-more-btn__element"
        type="button"
        onClick={onAddMovies}
      >
        Ещё
      </button>
    </div>
  );
}
