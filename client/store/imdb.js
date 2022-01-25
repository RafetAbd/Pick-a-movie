import axios from 'axios'


const GOT_ALL_MOVIES = 'GOT_ALL_MOVIES';
const REMOVE_MOVIE = 'REMOVE_MOVIE';

// const API_KEY = process.env.REACT_APP_API_KEY;


export const gotMovies = (movies) => {
    return {
        type: GOT_ALL_MOVIES,
        movies
    }
}

export const removeMovie = (movie) => {
    return {
        type: REMOVE_MOVIE,
        movie
    }
}

export const fetchAllMoviesFromIMDb = () => {
    return async (dispatch) => {
        try {
            // const { data: response } = await axios('https://imdb-api.com/en/API/MostPopularMovies/k_ww4cypd0');
            const { data: response } = await axios(`https://imdb-api.com/en/API/MostPopularMovies/k_ww4cypd0`);

            dispatch(gotMovies(response.items))
        } catch (err) {
            console.log(err)
        }
    }
}

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case GOT_ALL_MOVIES:
            return action.movies;
        case REMOVE_MOVIE:
            return state.filter((item) =>
                item.id !== action.movie.id
            );
        default:
            return state
    }
}