import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "04c19caa6e94d034f5b2e30a5b62cfdd";

export const fetchAsyncMovies = createAsyncThunk("movies/fetchAsyncMovies", async (arg, { getState }) => {
  const state = getState();
  console.log(state);
  const response = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY + "&page=" + state.movies.page);
  const data = await response.json();
  return data;
});

const initialState = {
  movies: {},
  page: 1,
  visiblePopup: false,
  popupMovie: {}
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, { payload }) => {
      state.movies.movies = payload;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    decrementPage: (state) => {
      if (state.page !== 1) state.page -= 1;
    },
    showPopup: (state, {payload}) => {
        state.popupMovie = payload;
        state.visiblePopup = true;
    },
    hidePopup: (state) => {
        state.visiblePopup = false;
    }
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Pending...");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched successfully!");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected.");
    },
  },
});

export const { hidePopup, showPopup, setMovies, incrementPage, decrementPage, setMoviesPage } = moviesSlice.actions;

export const getAllMovies = (state) => state.movies.movies.results;
export const getMoviesPage = (state) => state.movies.page;
export const getVisiblePopup = (state) => state.movies.visiblePopup;
export const getPopupMovie = (state) => state.movies.popupMovie;

export default moviesSlice.reducer;
