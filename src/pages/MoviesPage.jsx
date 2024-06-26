import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getSearchingMovie } from "../components/Api/api";
import SearchBar from "../components/SearchBar/SearchBar";
import MovieList from "../components/MovieList/MovieList";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams({ query: "" });
  const location = useLocation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const query = searchParams.get("query");
        const page = parseInt(searchParams.get("page")) || 1;

        if (!query) {
          setMovies([]);
          return;
        }

        const searchData = await getSearchingMovie(query, page);
        setMovies((prevMovies) =>
          page === 1 ? searchData : [...prevMovies, ...searchData]
        );
        setCurrentPage(page);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchParams]);

  const handleSearch = (query, currentPage) => {
    try {
      setSearchParams({ query, page: currentPage });
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const loadMore = async () => {
    try {
      const query = searchParams.get("query");
      const nextPage = currentPage + 1;
      const newData = await getSearchingMovie(query, nextPage);
      setMovies((prevMovies) => [...prevMovies, ...newData]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error loading more movies:", error);
    }
  };

  return (
    <div>
      <h2>
        {searchParams.get("query")
          ? `Search results for ${searchParams.get("query")}`
          : "Discover Movies"}
      </h2>
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={movies} state={location.state} onLoadMore={loadMore} />
      {movies.length > 0 && <LoadMoreBtn onClick={loadMore} />}
    </div>
  );
};

export default MoviesPage;
