import React, { useEffect, useState, useRef } from "react";
import MoviesCard from "../components/MoviesCard";
import "../css/RenderCards.css";
import { CircularProgress } from "@mui/material";
const RenderCards = () => {
  const TMDB_API_KEY = "3937772d46b20fca4e9026261576ecbf";
  const BASE_URL = "https://api.themoviedb.org/3";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const observerRef = useRef();
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
        );
        const data = await response.json();
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);
  return (
    <div className="movies-flex">
      {movies.map((item, index) => (
        <MoviesCard key={index} movie={item} />
      ))}
      {loading && (
        <div>
          <CircularProgress size="3rem" />
        </div>
      )}
      <div ref={observerRef} style={{ height: "1px" }}></div>
    </div>
  );
};

export default RenderCards;
