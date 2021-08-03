import { useEffect, useState } from "react";
import MoveCard from "./MovieCard";
import { findGenreName } from "../../helper/Helper";
import { getGenres } from "../../services";
import styles from "./Movies.module.css";
import Loader from "../Loader/Loader";

export default function Movies({ movies, loading }) {
  const [genres, setGenres] = useState("");

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
