import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../service/services";
import StarsIcon from "@material-ui/icons/Stars";
import styles from "./MovieDetails.module.css";
import { getImgUrl } from "../../helper/imgFullUrl";
import Loader from '../../components/Loader/Loader'

export default function MovieDetails() {
  const [movieDetail, setMovieDetail] = useState("");
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    getMovieById(id).then((res) => {
      setMovieDetail(res);
      setLoading(false);
    });
  }, [id]);
  // console.log(movieDetail)

  return loading ? (
    <div className={styles.backgroundLoading}>
      <Loader size={80} />
    </div>
  ) : (
    <div className={styles.page}>
      <img
        className={styles.backgroundDetails}
        src={getImgUrl(movieDetail.backdrop_path)}
        alt={movieDetail.title}
        width="100%"
        height="100%"
      />
      <div className={styles.container}>
        <div className={styles.poster}>
          <img
            className={styles.backgroundPath}
            src={getImgUrl(movieDetail.poster_path)}
            alt={movieDetail.title}
            width="100%"
          />
        </div>
        <div className={styles.date}>{movieDetail.release_date}</div>
        <div className={styles.info}>{movieDetail.status}</div>
        <div className={styles.title}>{movieDetail.title}</div>
        <div className={styles.overview}>
          <i>{movieDetail.overview}</i>
        </div>
        <div className={styles.rating}>
          <StarsIcon className={styles.icon} />
          {movieDetail.vote_average}
        </div>
        <div className={styles.status}>
          <i>{movieDetail.tagline}</i>
        </div>
        <div className={styles.runtime}>{movieDetail.runtime} minute</div>
      </div>
    </div>
  );
}
