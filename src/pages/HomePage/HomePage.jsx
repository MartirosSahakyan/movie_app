import { useEffect, useState } from "react";
import {
  getGenres,
  getMoviesByPage,
  getMoviesByQuery,
} from "../../service/services";
import { Switch, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Routes } from "../../constants/routes";
import { getLocalStorage } from "../../helper/localStorage";
import { storage } from "../../constants/storage";

const initialFavCount = getLocalStorage(storage.fav)
  ? getLocalStorage(storage.fav).length
  : 0;

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [favCount, setFavCount] = useState(initialFavCount);
  const [genres, setGenres] = useState("");

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

  useEffect(() => {
    getGenres().then(({ genres }) => {
      setGenres(genres);
    });
  }, []);

  return (
    <>
      <Header handleSearchInput={handleSearchInput} favCount={favCount} />
      <Switch>
        <Route
          exact
          path={Routes.movies.url}
          component={() => (
            <Routes.movies.component
              setCurrPage={setCurrPage}
              movies={movies}
              loading={loading}
              setFavCount={setFavCount}
              genres={genres}
            />
          )}
        />
        <Route
          exact
          path={Routes.favoritePage.url}
          component={() => (
            <Routes.favoritePage.component setFavCount={setFavCount} />
          )}
        />
        <Route
          path={`${Routes.movieDetails.url}:id`}
          component={Routes.movieDetails.component}
        ></Route>
      </Switch>
    </>
  );
}
