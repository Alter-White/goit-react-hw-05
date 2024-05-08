import { useEffect, useState } from "react";
import css from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../Api/api";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      if (movieId !== undefined) {
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {reviews !== undefined && reviews.length > 0 ? (
        <ul className={css.reviewsList}>
          {reviews.map((review, index) => (
            <li className={css.reviewsItem} key={index}>
              <p className={css.reviewsAuthor}>Author: {review.author}</p>
              <p className={css.reviewsText}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        "Sorry, there are no reviews to show"
      )}
    </div>
  );
};

export default MovieReviews;
