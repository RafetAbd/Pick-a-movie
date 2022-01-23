import axios from 'axios'

const ADD_MATCHED_MOVIE = 'ADD_MATCHED_MOVIE';
const GOT_MATCHED_MOVIES = 'GOT_MATCHED_MOVIES';

const gotMatchedMovies = (movies) => {
    return {
        type: GOT_MATCHED_MOVIES ,
        movies
    }
}

const addMatchedMovie = (movie) => {
    return {
        type: ADD_MATCHED_MOVIE,
        movie
    }
}

const fetchMatchedMovies = () => {
    return async(dispatch) => {
        try {
            
        } catch (err) {
            console.log(err)
        }
    }
}
