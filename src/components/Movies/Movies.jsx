import { useEffect } from "react";
import PropTypes from "prop-types";
import MoveCard from "../MovieCard/MovieCard";
import ScrollTop from "../ScrollTop/ScrollTop";
import Loader from "../Loader/Loader";
import styles from "./Movies.module.css";
import { findGenreName } from "../../helper/utils";

export default function Movies({
  movies,
  loading,
  setCurrPage,
  setFavCount,
  genres,
}) {
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

  return (
    <section className={styles.container}>
      {loading ? (
        <div style={{ marginTop: "100px" }}>
          <Loader />
        </div>
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
              setFavCount={setFavCount}
            />
          );
        })
      )}
      <ScrollTop></ScrollTop>
    </section>
  );
}

Movies.propTypes = {
  movies: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  setCurrPage: PropTypes.func.isRequired,
  setFavCount: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
};
