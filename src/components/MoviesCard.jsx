import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import MoviePage from "../pages/MovieModal";

export default function ActionAreaCard({ movie }) {
  const [openMoviesModal, setOpenMoviesModal] = React.useState(false);
  const renderSpecificMovie = () => {
    setOpenMoviesModal(true);
  };
  return (
    <>
      <Card
        sx={{ margin: "10px", width: "245px", cursor: "pointer" }}
        onClick={renderSpecificMovie}
      >
        <CardActionArea>
          <CardMedia
            sx={{
              height: 200, // Set a consistent height for the image
              objectFit: "cover", // Ensures the image covers the area proportionally
            }}
            component="img"
            height="140"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {movie.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Release Date: {movie.release_date}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ⭐{movie.vote_average}/10
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <MoviePage
        setOpenMoviesModal={setOpenMoviesModal}
        openMoviesModal={openMoviesModal}
        movie={movie}
      ></MoviePage>
    </>
  );
}
