import axios from 'axios'
const MATCHED = 'MATCHED';

const ADD_MATCHED_MOVIE = 'ADD_MATCHED_MOVIE';
const GOT_MATCHED_MOVIES = 'GOT_MATCHED_MOVIES';
const REMOVE_MATCHED_MOVIES = 'REMOVE_MATCHED_MOVIES';

export const gotMatchedMovies = (movies) => {
    return {
        type: GOT_MATCHED_MOVIES,
        movies
    }
}

export const addMatchedMovie = (movie) => {
    // console.log(movie.movieId)
    return {
        type: ADD_MATCHED_MOVIE,
        movie
    }
}

export const removeMatchedMovies = () => {
    return {
        type: REMOVE_MATCHED_MOVIES,
    };
};

export const fetchMatchedMovies = (roomId) => {
    return async (dispatch) => {
        try {
            const { data: response } = await axios(`/api/rooms/matchedmovies/${roomId}`);
            dispatch(gotMatchedMovies(response))
        } catch (err) {
            console.log(err)
        }
    }
}



// const initialState = JSON.parse(window.localStorage.getItem(MATCHED)) || [];

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case GOT_MATCHED_MOVIES:
            return action.movies
        case ADD_MATCHED_MOVIE:
            // check if the movie excist in the list
            // console.log(state)
            let alreadyExist = state.filter((item) => {
                return item.movieId === action.movie.movieId
            });
            // console.log(alreadyExist)
            if (alreadyExist.length) return state
            else return [...state, action.movie]
            // return state
        case REMOVE_MATCHED_MOVIES:
            return []
        default:
            return state
    }
}


