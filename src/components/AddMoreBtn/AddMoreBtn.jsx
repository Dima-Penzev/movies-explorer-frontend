import s from "./AddMoreBtn.module.css";

export default function AddMoreBtn() {
  return (
    <div className={s.addMoreBtn}>
      <button className={s.addMoreBtn__element}>Ещё</button>
    </div>
  );
}
