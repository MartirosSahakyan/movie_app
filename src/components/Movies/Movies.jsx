import { useEffect, useState } from "react";
import MoveCard from "./MovieCard";
import { findGenreName } from "../../helper/Helper";
import { getGenres } from "../../services";
import styles from "./Movies.module.css";

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
        <p>Loading</p>
      ) : !movies.total_pages ? (
        <h3>No Such Film</h3>
      ) : (
        movies.results.map((movie) => {
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
