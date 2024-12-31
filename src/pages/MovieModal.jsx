import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import "../css/MovieModal.css";

export default function MovieModal({
  openMoviesModal,
  setOpenMoviesModal,
  movie,
}) {
  const TMDB_API_KEY = "3937772d46b20fca4e9026261576ecbf";
  const BASE_URL = "https://api.themoviedb.org/3";
  const [castAndCrew, setCastAndCrew] = useState({ cast: [], crew: [] });
  const [similarMovies, setSimilarMovies] = useState([]);
  const [videoDetails, setVideoDetails] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => {
    setOpenMoviesModal(false);
  };
  const renderCastAndCrew = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movie.id}/credits?api_key=${TMDB_API_KEY}&language=en-US`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movie credits");
      }

      const data = await response.json();

      // Log or process the cast and crew data
      setCastAndCrew({ cast: data.cast, crew: data.crew });

      // You can use this data to update the UI or store it in state
    } catch (error) {
      console.error("Error fetching movie credits:", error);
    }
  };
  const getSimilarMovies = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movie.id}/similar?api_key=${TMDB_API_KEY}&language=en-US`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch similar movies");
      }

      const data = await response.json();
      setSimilarMovies(data.results);
    } catch (error) {
      console.error("Error fetching similar movies:", error);
      return [];
    }
  };
  const getVideoDetails = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movie videos");
      }

      const data = await response.json();
      const trailer = data.results.find((video) => video.type === "Trailer");

      if (trailer) {
        setVideoDetails(trailer); // Set trailer details to state
      } else {
        setVideoDetails(null); // If no trailer, set null
      }
    } catch (error) {
      console.error("Error fetching video details:", error);
      setVideoDetails(null); // Set null in case of an error
    }
  };
  useEffect(() => {
    renderCastAndCrew(); // Fetch cast and crew
    getSimilarMovies(); // Fetch similar movies
  }, []);

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={openMoviesModal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        // sx={{ display: "flex" }}
      >
        <DialogTitle id="responsive-dialog-title">{movie.title}</DialogTitle>
        <DialogContent>
          <div className="flex">
            <img
              className="modal-image"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            ></img>
            <DialogContentText>
              <h3>Synopsis</h3> {movie.overview}
            </DialogContentText>
          </div>
          <h3 className="h3-background">Cast</h3>
          <div className="cast-crew-container">
            {castAndCrew.cast.map((item, index) => (
              <div key={index} className="cast-and-crew">
                <Avatar
                  alt={item.name}
                  src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <h3 className="h3-background">Crew</h3>
          <div className="cast-crew-container">
            {castAndCrew.crew.map((item, index) => (
              <div key={index} className="cast-and-crew">
                <Avatar
                  alt={item.name}
                  src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <div>
            {videoDetails[0] ? (
              <div>
                <h3>Trailer</h3>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${videoDetails.key}`}
                  title="Movie Trailer"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p>No trailer available</p>
            )}
          </div>
          <h3 className="h3-background">Similar Movies</h3>
          <div className="cast-crew-container">
            {similarMovies.map((item, index) => (
              <div key={index} className="cast-and-crew">
                <Avatar
                  alt={item.name}
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                />
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
