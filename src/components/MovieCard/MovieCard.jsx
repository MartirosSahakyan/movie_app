import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { getLocalStorage, setLocalStorage } from "../../helper/localStorage";
import { getImgUrl } from "../../helper/utils";
import { storage } from "../../constants/storage";
import { Routes } from "../../constants/routes";

const useStyles = makeStyles({
  root: {
    maxWidth: 245,
    marginBottom: 30,
    marginTop: 30,
  },

  favBtn: {
    padding: 0,
  },
  genres: {
    margin: 2,
  },
});

let favorites = [];

export default function MoveCard({ title, imgPath, genres, id, setFavCount }) {
  const classes = useStyles();
  let isfav = favorites.some((movie) => movie.id === id);

  const [isFavorite, setIsFavorite] = useState(isfav);

  favorites = getLocalStorage(storage.fav) ? getLocalStorage(storage.fav) : [];

  const handleFavIconToggle = () => {
    setIsFavorite(!isFavorite);
    const movieInfo = {
      title,
      imgPath,
      genres,
      id,
      isFavorite: !isFavorite,
    };

    if (isFavorite) {
      setLocalStorage(
        storage.fav,
        favorites.filter((movie) => movie.id !== id)
      );
      setFavCount((prevFavCount) => prevFavCount - 1);
    } else {
      favorites.push(movieInfo);
      setLocalStorage(storage.fav, favorites);
      setFavCount((prevFavCount) => prevFavCount + 1);
    }
  };

  return (
    <Card className={classes.root}>
      <Link to={`${Routes.movieDetails.url}${id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="350"
            image={getImgUrl(imgPath)}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              style={{ textAlign: "center" }}
              gutterBottom
              variant="h6"
              component="h2"
              color="textPrimary"
            >
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {genres.map((genre, index) => {
                return (
                  <Chip
                    className={classes.genres}
                    key={index}
                    label={genre}
                    variant="outlined"
                    color="primary"
                    size="small"
                  />
                );
              })}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button
          className={classes.favBtn}
          size="small"
          color="primary"
          onClick={handleFavIconToggle}
        >
          {isFavorite ? (
            <FavoriteIcon style={{ color: "orange" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </Button>
      </CardActions>
    </Card>
  );
}

MoveCard.propTypes = {
  title: PropTypes.string.isRequired,
  imgPath: PropTypes.string,
  genres: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  setFavCount: PropTypes.func.isRequired,
};
