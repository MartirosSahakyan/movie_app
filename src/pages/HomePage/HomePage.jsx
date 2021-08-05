import { useEffect, useState } from "react";
import { getMoviesByPage, getMoviesByQuery } from "../../service/services";
import { Switch, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Routes } from "../../constants/routes";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    getMoviesByPage(currPage).then(({ results }) => {
      setMovies([...movies, ...results]);
      setLoading(false);
    });
  }, [currPage]);

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      getMoviesByQuery(searchQuery)
        .then(({ results }) => {
          setMovies(results);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      getMoviesByPage(1).then(({ results }) => {
        setMovies(results);
        setLoading(false);
      });
    }
  }, [searchQuery]);

  return (
    <>
      <Header handleSearchInput={handleSearchInput} />
      <Switch>
        <Route
          exact
          path={Routes.movies.url}
          component={() => (
            <Routes.movies.component
              setCurrPage={setCurrPage}
              movies={movies}
              loading={loading}
            />
          )}
        />
        <Route
          exact
          path={Routes.favoritePage.url}
          component={Routes.favoritePage.component}
        />
        <Route
          path={`${Routes.movieDetails.url}:id`}
          component={Routes.movieDetails.component}
        ></Route>
      </Switch>
    </>
  );
}
