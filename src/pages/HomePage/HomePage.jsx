import { useEffect, useState } from "react";
import { getMoviesByPage, getMoviesByQuery } from "../../services";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieDetails from "../../components/Movies/MovieDetails";
import Header from "../../components/Header/Header";
import Movies from "../../components/Movies/Movies";
import { FavoritePage } from "../FavoritePage/FavoritePage";
import LoginPage from "../LoginPage/LoginPage";

export default function HomePage() {
  const [movies, setMovies] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // const [error, setError] = useState(false);

  // const [scroll, setScroll] = useState(1);
  // window.addEventListener("scroll", (e) => {
  //   if (e.path[1].pageYOffset / 3320 === 1) {
  //     setScroll((prevState) => prevState + 1);
  //     console.log(scroll);
  //   }
  // });

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    setLoading(true);
    getMoviesByPage(1).then((res) => {
      setMovies(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      getMoviesByQuery(searchQuery)
        .then((res) => {
          // setError(false)
          setMovies(res);
          // console.log(res);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          // setError(true)
        });
    } else {
      setLoading(true);
      getMoviesByPage(1).then((res) => {
        setMovies(res);
        setLoading(false);
      });
    }
  }, [searchQuery]);

  // console.log(movies);
  // console.log(searchQuery);

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
