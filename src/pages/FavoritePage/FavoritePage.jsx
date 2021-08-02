import { useState } from "react";
import MoveCard from "../../components/Movies/MovieCard";
import styles from "./FavoritePage.module.css";

export function FavoritePage() {
  const movies = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : "";

  //   const [movies, setMovie] = useState(initialState);
  console.log("favorite page render");
  return (
    <section className={styles.container}>
      {!movies.length ? (
        <h2>You haven`t any favorite film</h2>
      ) : (
        movies.map((movie) => {
          return (
            <MoveCard
              title={movie.title}
              imgPath={movie.imgPath}
              genres={movie.genres}
              id={movie.id}
              key={movie.id}
            />
          );
        })
      )}
    </section>
  );
}
