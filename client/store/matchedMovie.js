import axios from 'axios'
const TOKEN = 'token'

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

// will get all the matched movies from the backend thats associated with the room.
export const fetchMatchedMovies = (roomId) => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem(TOKEN);
            const { data: response } = await axios.get(`/api/rooms/matchedmovies/${roomId}`, {
                headers: {
                    authorization: token,
                },
            });
            dispatch(gotMatchedMovies(response))
        } catch (err) {
            console.log(err)
        }
    }
}

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case GOT_MATCHED_MOVIES:
            return action.movies
        case ADD_MATCHED_MOVIE:
            // this is going to check if the movie already in the state.
            // if yes, then won't add it.
            //if no, then add it to dispaly it.
            let alreadyExist = state.filter((item) => {
                return item.movieId === action.movie.movieId
            });
            if (alreadyExist.length) return state
            else return [...state, action.movie]
        case REMOVE_MATCHED_MOVIES:
            return []
        default:
            return state
    }
}


