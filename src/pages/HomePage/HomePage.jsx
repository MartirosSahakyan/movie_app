import { useEffect, useState } from "react";
import MoveCard from "../../components/MovieCard";
import { getMovies, getMoviesByPage } from "../../service";

export default function HomePage() {
  const [movies, setMovies] = useState("");

  useEffect(() => {
    getMoviesByPage(1).then((res) => {
      setMovies(res);
    });
  }, []);

  //   console.log(movies.results);

  return (
    <>
      <h1>HOME PAGES</h1>
      {movies &&
        movies.results.map((movie) => {
          return (
            <MoveCard
              key={movie.id}
              title={movie.title}
              description={movie.overview}
              imgPath={movie.poster_path}
            />
          );
        })}
    </>
  );
}
