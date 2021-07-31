import { useEffect, useState } from "react";
import MoveCard from "../../components/MovieCard";
import { getGenres, getMoviesByPage, getMoviesByQuery } from "../../services";
import styles from "./HomePage.module.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MovieDetails from "../../components/MovieDetails";
import Header from "../../components/Header/Header";
import { findGenreName } from "../../helper/Helper";

export default function HomePage() {
  const [movies, setMovies] = useState("");
  const [genres, setGenres] = useState("");
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchInput = (e) =>{
    setSearchQuery(e.target.value)
  }
  useEffect(() => {
    getMoviesByPage(1).then((res) => {
      setMovies(res);
    });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      getMoviesByQuery(searchQuery).then((res) => {
        setMovies(res);
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
              {movies &&
                movies.results.map((movie) => {
                  return (
                    
                    <MoveCard
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      genres = { genres ? findGenreName(genres, movie.genre_ids) : []}
                      // description={movie.overview}
                      imgPath={movie.poster_path}
                    />
                    
                  );
                })}
            </section>
          </Route>
          <Route path="/home/:id" children={<MovieDetails />}></Route>
        </Switch>
      </Router>
    </>
  );
}
