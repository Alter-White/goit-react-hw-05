import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div>
      <button className={css.loadMoreBtn} onClick={onClick}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
