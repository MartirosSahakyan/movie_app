import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services";
import Loader from "../Loader/Loader";

export default function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState("");
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    // setLoading(true)
    getMovieById(id).then((res) => {
      setMovieDetails(res);
      setLoading(false);
    });
  }, []);

//   console.log(movieDetails);
  return (
    <div>
      {loading ? <Loader /> : <h1>Details ID::: {movieDetails.title}</h1>}
    </div>
  );
}
