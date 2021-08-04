import { useState } from "react";
import MoveCard from "../../components/MovieCard/MovieCard";
import { storage } from "../../constants/storage";
import { getLocalStorage } from "../../helper/localStorage";
import styles from "./FavoritePage.module.css";

export function FavoritePage() {
  const movies = getLocalStorage(storage.fav)
    ? getLocalStorage(storage.fav)
    : "";
  // fake render favorite page for dynamic delete cards from favorite pages
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
