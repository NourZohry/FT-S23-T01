import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hidePopup, getPopupMovie, getVisiblePopup, showPopup, fetchAsyncMovies, incrementPage, decrementPage, getAllMovies, getMoviesPage } from "./moviesSlice";
import { Box, Button, Card, CardContent, CardMedia, Grid, Modal, Typography } from "@mui/material";

export const Movies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMovies());
  }, [dispatch, useSelector(getMoviesPage)]);

  const movies = useSelector(getAllMovies);
  const visiblePopup = useSelector(getVisiblePopup);
  const popupMovie = useSelector(getPopupMovie);

  const handleClose = (() =>  {
    dispatch(hidePopup())
  })

  return (
    <>
      <Box mx={8}>
        {movies && (
          <Grid
            container
            spacing={4}
          >
            {movies.map((movie) => {
              return (
                <Grid
                  item
                  md={3}
                  onClick={() => dispatch(showPopup(movie))}
                >
                  <Card sx={{ height: "100%", '&:hover': { cursor: "pointer" }, }}>
                    <CardMedia
                      sx={{ width: "100%" }}
                      image={"https://image.tmdb.org/t/p/original" + movie.poster_path}
                      title={movie.title}
                      component="img"
                    />
                    <CardContent>
                      <Typography
                        textAlign={"center"}
                        fontWeight={"bold"}
                      >
                        {movie.title}
                      </Typography>
                      <Typography
                        textAlign={"center"}
                        fontWeight={"bold"}
                      >
                        {movie.vote_average}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
      {movies && (
        <Box
          textAlign="center"
          my={3}
        >
          <Button
            variant="outlined"
            sx={{ marginX: "5px", textTransform: "capitalize", color: "#333", borderColor: "#333", fontWeight: "bold" }}
            onClick={() => dispatch(decrementPage())}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            sx={{ marginX: "5px", textTransform: "capitalize", color: "#333", borderColor: "#333", fontWeight: "bold" }}
            onClick={() => dispatch(incrementPage())}
          >
            Next
          </Button>
        </Box>
      )}
      {visiblePopup && (
        <Modal
          open={visiblePopup}
          // open={open}
          onClose={handleClose}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
            }}
          >
            <Card sx={{display: "flex"}}>
              <CardMedia
                component="img"
                sx={{ width: "50%" }}
                image={"https://image.tmdb.org/t/p/original" + popupMovie.poster_path}
                alt={popupMovie.title}
              />
              <Box p={2} sx={{display: "flex", flexDirection: "column", gap: "14px"}}> 
              <Typography component="h3" sx={{fontSize: "20px", fontWeight: "bold"}}>
                  {popupMovie.title}
                </Typography>
                <Typography component="h4" sx={{fontSize: "20px", fontWeight: "bold"}}>
                  IMDB Rating: {popupMovie.vote_average} ({popupMovie.vote_count} votes)
                </Typography>
                <Typography>
                  {popupMovie.overview}
                </Typography>
              </Box>
            </Card>
          </Box>
        </Modal>
      )}
    </>
  );
};
