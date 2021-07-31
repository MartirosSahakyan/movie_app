import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services";

export default function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState("");
  let { id } = useParams();

  useEffect(() => {
    getMovieById(id).then((res) => setMovieDetails(res));
  }, []);
  
  console.log(movieDetails);
  return <h1>Details ID::: {movieDetails.title}</h1>;
}
