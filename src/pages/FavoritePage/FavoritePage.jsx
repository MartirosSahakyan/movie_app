import { useState } from "react";
import MoveCard from "../../components/Movies/MovieCard";
import styles from "./FavoritePage.module.css";

export function FavoritePage() {
  const movies = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : "";
  // fake render favorite page for dinamik delete cards from favorite pagei
  const [fakeState, setFakeState] = useState(1);
  const fakeRender = () => {
    setFakeState(fakeState + 1);
  };


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
              fakeRender={fakeRender}
            />
          );
        })
      )}
    </section>
  );
}
