import { useEffect, useState } from "react";
import { getMoviesByPage, getMoviesByQuery } from "../../services";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieDetails from "../../components/Movies/MovieDetails";
import Header from "../../components/Header/Header";
import Movies from "../../components/Movies/Movies";
import { FavoritePage } from "../FavoritePage/FavoritePage";
import LoginPage from "../LoginPage/LoginPage";

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

  window.addEventListener("scroll", function (e) {
    if (
      Math.ceil(window.scrollY) + 50 >=
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight
    ) {
      setCurrPage((prevCurrPage) => prevCurrPage + 1);
      window.scrollBy(-20, -20);
    }
  });

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
      <Router>
        <Header handleSearchInput={handleSearchInput} />
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/home">
            <Movies movies={movies} loading={loading} />
          </Route>
          <Route path="/home/favorites">
            <FavoritePage />
          </Route>
          <Route path="/home/:id" children={<MovieDetails />}></Route>
        </Switch>
      </Router>
    </>
  );
}
