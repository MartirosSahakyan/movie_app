import { useEffect, useState } from "react";
import MoveCard from "../../components/MovieCard";
import { getGenres, getMoviesByPage } from "../../services";
import styles from "./HomePage.module.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // useParams,
} from "react-router-dom";
import MovieDetails from "../../components/MovieDetails";
import Header from "../../components/Header/Header";

export default function HomePage() {
  const [movies, setMovies] = useState("");
  const [genres, setGenres] = useState("");

  useEffect(() => {
    getMoviesByPage(1).then((res) => {
      setMovies(res);
    });
  }, []);

  useEffect(() => {
    getGenres().then(({ genres }) => {
      setGenres(genres);
    });
  }, []);

  // console.log(movies);
  // console.log(genres);

  return (
    <>
      <Router>
        <Header />

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
                      description={movie.overview}
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
