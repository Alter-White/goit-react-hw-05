import { useEffect, useState } from "react";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";
import MovieList from "../components/MovieList/MovieList";
import { getTrendingMovies } from "../components/Api/api";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      if (page !== undefined) {
        const trendingMovies = await getTrendingMovies(page);
        setMovies((prevMovies) => [...prevMovies, ...trendingMovies]);
      }
    };

    fetchTrendingMovies();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h2>Trending Today</h2>
      {Array.isArray(movies) && movies !== undefined && (
        <MovieList movies={movies} page={page} />
      )}
      <LoadMoreBtn onClick={loadMore} />
    </div>
  );
};

export default HomePage;
