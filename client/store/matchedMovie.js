import axios from 'axios'

const ADD_MATCHED_MOVIE = 'ADD_MATCHED_MOVIE';
const GOT_MATCHED_MOVIES = 'GOT_MATCHED_MOVIES';

export const gotMatchedMovies = (movies) => {
    return {
        type: GOT_MATCHED_MOVIES,
        movies
    }
}

export const addMatchedMovie = (movie) => {
    return {
        type: ADD_MATCHED_MOVIE,
        movie
    }
}

export const fetchMatchedMovies = (roomId) => {
    return async (dispatch) => {
        try {
            const { data: response } = await axios();
            dispatch(gotMatchedMovies(response))
        } catch (err) {
            console.log(err)
        }
    }
}

// export const addMovie = (movie, roomId) => {
//     return async (dispatch) => {
//         try {
//             const { data: response } = await axios();
//             dispatch(addMatchedMovie(response))
//         } catch (err) {
//             console.log(err)
//         }
//     }
// }

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case GOT_MATCHED_MOVIES:
            return action.movies
        case ADD_MATCHED_MOVIE:
            return [...state, action.movie];
        default:
            return state
    }
}


