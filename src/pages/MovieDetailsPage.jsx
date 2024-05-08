import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { getMovieDetails } from "../components/Api/api";

const MovieDetailsPage = () => {
  const posterDefault = (
    <img src={`/img/posterDefault.jpg`} width={600} height={400} alt="poster" />
  );

  const [currentMovie, setCurrentMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const backHref = useRef(location.state || "/movies");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (movieId !== undefined) {
        const movieData = await getMovieDetails(movieId);
        setCurrentMovie(movieData);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!currentMovie) return <Loader />;

  return (
    <div>
      <Link
        to={backHref.current}
        style={{
          display: "block",
          margin: 20,
          textDecoration: "none",
        }}
      >
        Go back
      </Link>
      <h2>{currentMovie.title}</h2>
      {currentMovie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}
          alt={currentMovie.title}
          width={400}
        />
      ) : (
        posterDefault
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 20,
          padding: 20,
          border: "1px solid black",
          borderRadius: 10,
        }}
      >
        <p>Popularity: {currentMovie.popularity.toFixed(1)}</p>
        <p>Release Date: {currentMovie.release_date}</p>
        <p>Overview: {currentMovie.overview}</p>
      </div>

      <Outlet />

      <NavLink to={`/movies/${movieId}/cast`}>
        <h3 style={{ cursor: "pointer" }}>Cast</h3>
      </NavLink>

      <NavLink to={`/movies/${movieId}/reviews`}>
        <h3 style={{ cursor: "pointer" }}>Reviews</h3>
      </NavLink>
    </div>
  );
};

export default MovieDetailsPage;
