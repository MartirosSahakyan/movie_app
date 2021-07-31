import { useState } from "react";
import MoveCard from "../../components/Movies/MovieCard";
import styles from "./FavoritePage.module.css";

export function FavoritePage() {
  const initialState = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : "";

  const [movies, setMovie] = useState(initialState);
  //   console.log(movie.genres);
  return (
    <section className={styles.container}>
      {movies.map((movie) => {
        return (
          <MoveCard
            title={movie.title}
            imgPath={movie.imgPath}
            genres={movie.genres}
            id={movie.id}
            key={movie.id}
          />
        );
      })}
    </section>
  );
}
