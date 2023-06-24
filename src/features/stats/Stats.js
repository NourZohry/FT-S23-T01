import { Box, Typography } from "@mui/material";
import React from "react";

import { useSelector } from "react-redux";
import { getAllMovies, getMoviesPage } from "../movies/moviesSlice";

export const Stats = () => {
  let movies = useSelector(getAllMovies);
  const maxRating =  Math.max(...movies.map(movie => movie.vote_average));
  const maxRatingMovie = movies.find((movie) => { return movie.vote_average === maxRating; })
  return (
    <Box sx={{border: "1px solid lightgrey"}} p={2} pt={1} mb={3}>
      <Typography component="h1" sx={{fontSize: "32px"}}>Stats</Typography>
      <Typography component="h2" sx={{fontSize: "14px"}}>Current page: { useSelector(getMoviesPage) }</Typography >
      <Typography component="h2" sx={{fontSize: "14px"}}>Number of Movies: { useSelector(getAllMovies).length }</Typography >
      <Typography component="h2" sx={{fontSize: "14px"}}>Top rated movie: {maxRatingMovie.title}</Typography >
      <Typography component="h2" sx={{fontSize: "14px"}}>Rating: {maxRating} </Typography >
    </Box>
  );
};
