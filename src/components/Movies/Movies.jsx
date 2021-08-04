import { useEffect, useState } from "react";
import MoveCard from "./MovieCard";
import { findGenreName } from "../../helper/findGenreName";
import { getGenres } from "../../service/services";
import styles from "./Movies.module.css";
import Loader from "../Loader/Loader";
import PropTypes from 'prop-types'

export default function Movies({ movies, loading, setCurrPage }) {
  const [genres, setGenres] = useState("");

  const lazyLoad = () => {
    if (
      Math.ceil(window.scrollY) + 50 >=
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight
    ) {
      setCurrPage((prevCurrPage) => prevCurrPage + 1);
      window.scrollBy(-20, -20);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", lazyLoad);
    return () => window.removeEventListener("scroll", lazyLoad);
  });

  useEffect(() => {
    getGenres().then(({ genres }) => {
      setGenres(genres);
    });
  }, []);

  return (
    <section className={styles.container}>
      {loading ? (
        <Loader />
      ) : !movies ? (
        <h3>No Such Fim</h3>
      ) : (
        movies.map((movie) => {
          return (
            <MoveCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              genres={genres ? findGenreName(genres, movie.genre_ids) : []}
              imgPath={movie.poster_path}
            />
          );
        })
      )}
    </section>
  );
}

Movies.propTypes ={
  movies: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  setCurrPage: PropTypes.func.isRequired
}