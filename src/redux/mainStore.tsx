import { createSlice, configureStore } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movieList: [
            {
                Title: '',
                Poster: '',
                Type: '',
                Year: '',
                imdbID: '',
            }
        ],
        moviesCount: 0,
        movieDetails: {
            title: '',
            year: '',
            rated: '',
            released: '',
            runtime: '',
            actors: '',
            plot: '',
            language: '',
            type: '',
            imdbRating: '',
            imdbID: '',
            isFavourited: false
        },
        movieFavourites: [
            {
                id: '',
                title: '',
            }
        ]
    },
    reducers: {
        setMovies: (state, action) => {
            const { payload: { data, count} } = action;
            state.movieList = data;
            state.moviesCount = count;
        },
        addMovieDetails: (state, action) => {
            const { payload } = action;

            state.movieDetails = {
                title: payload.Title,
                year: payload.Year,
                rated: payload.Rated,
                released: payload.Released,
                runtime: payload.Runtime,
                actors: payload.Actors,
                plot: payload.Plot,
                language: payload.Language,
                type: payload.Type,
                imdbRating: payload.imdbRating,
                isFavourited: payload.isFavourited,
                imdbID: payload.imdbID,
            };
        },
        addFavourites: (state, action) => {
            const { payload } = action;
            state.movieFavourites = payload;
        },
        addMovieAsFavourite: (state, action) => {
            const { payload } = action;
            state.movieDetails = {
                ...state.movieDetails,
                isFavourited: true,
            };
            state.movieFavourites = [
                ...state.movieFavourites,
                payload
            ].filter((item) => item !== '');
        },
        removeMovieAsFavourite: (state, action) => {
            const { payload } = action;
            state.movieFavourites = payload;
        }
    }
});

export const { setMovies, addMovieDetails, addMovieAsFavourite, removeMovieAsFavourite, addFavourites } = moviesSlice.actions;

export const store = configureStore({
    reducer: moviesSlice.reducer
});