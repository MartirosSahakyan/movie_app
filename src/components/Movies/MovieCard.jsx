import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getImgUrl } from "../../services";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    maxWidth: 245,
    marginBottom: 30,
  },
  favBtn: {
    padding: 0,
  },
});

let favorites = [];

export default function MoveCard({ title, imgPath, genres, id, fakeRender }) {
  const classes = useStyles();
  let isfav = favorites.some((movie) => movie.id === id);
  const [isFavorite, setIsFavorite] = useState(isfav);

  favorites = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];

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
      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites.filter((movie) => movie.id !== id))
      );
    } else {
      favorites.push(movieInfo);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  return (
    <Card className={classes.root}>
      <Link to={`/home/${id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="350"
            image={getImgUrl(imgPath)}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {genres.map((genre, index) => {
                return <span key={index}>{genre}</span>;
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
          <span style={{ width: "100%", height: "100%" }} onClick={fakeRender}>
            {isFavorite ? "-" : "+"}
          </span>
        </Button>
      </CardActions>
    </Card>
  );
}
