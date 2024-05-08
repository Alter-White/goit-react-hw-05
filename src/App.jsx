import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import Navigation from "./components/Navigation/Navigation";
import clsx from "clsx";
import * as styles from "./App.modules.css";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);

const getNavLinkClassNames = ({ isActive }) =>
  clsx({
    [styles.active]: isActive,
  });

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
            className={getNavLinkClassNames}
          />
          <Route
            path="/movies"
            element={<MoviesPage />}
            className={getNavLinkClassNames}
          />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
