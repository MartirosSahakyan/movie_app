import MoveCard from "../../components/MovieCard/MovieCard";
import { storage } from "../../constants/storage";
import { getLocalStorage } from "../../helper/localStorage";
import styles from "./FavoritePage.module.css";
import PropTypes from "prop-types";

export function FavoritePage({ setFavCount }) {
  const movies = getLocalStorage(storage.fav)
    ? getLocalStorage(storage.fav)
    : "";

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
              setFavCount={setFavCount}
            />
          );
        })
      )}
    </section>
  );
}

FavoritePage.propTypes = {
  setFavCount: PropTypes.func.isRequired,
};
