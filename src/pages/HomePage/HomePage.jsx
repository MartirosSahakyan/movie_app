import { useEffect, useState } from "react";
import MoveCard from "../../components/MovieCard";
import { getGenres, getMoviesByPage, getMoviesByQuery } from "../../services";
import styles from "./HomePage.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieDetails from "../../components/MovieDetails";
import Header from "../../components/Header/Header";
import { findGenreName } from "../../helper/Helper";

export default function HomePage() {
  const [movies, setMovies] = useState("");
  const [genres, setGenres] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

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
      getMoviesByQuery(searchQuery).then((res) => {
        setMovies(res);
        setLoading(false);
      });
    }else{
      setLoading(true);
      getMoviesByPage(1).then((res) => {
        setMovies(res);
        setLoading(false);
      });
    }
  }, [searchQuery]);

  useEffect(() => {
    getGenres().then(({ genres }) => {
      setGenres(genres);
    });
  }, []);

  // console.log(movies);
  // console.log(genres);
  // console.log(searchQuery);

  return (
    <>
      <Router>
        <Header handleSearchInput={handleSearchInput} />

        <Switch>
          <Route exact path="/home">
            <section className={styles.container}>
              {loading ? (
                <p>Loading</p>
              ) : (
                movies.results.map((movie) => {
                  return (
                    <MoveCard
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      genres={
                        genres ? findGenreName(genres, movie.genre_ids) : []
                      }
                      imgPath={movie.poster_path}
                    />
                  );
                })
              )}
            </section>
          </Route>
          <Route path="/home/:id" children={<MovieDetails />}></Route>
        </Switch>
      </Router>
    </>
  );
}
