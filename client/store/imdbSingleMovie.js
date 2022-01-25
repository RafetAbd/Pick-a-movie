import axios from 'axios'

const GOT_MOVIE = 'GOT_MOVIE';

export const gotSingleMovie = (singleMovie) => {
    return {
        type: GOT_MOVIE,
        singleMovie
    }
}

export const fetchSingleMovieFromIMDb = (movieId) => {
    return async (dispatch) => {
        try {
            const { data: response } = await axios(`https://imdb-api.com/en/API/YouTubeTrailer/${process.env.DOTENV.REACT_APP_API_KEY}/${movieId}`);
            dispatch(gotSingleMovie(response))
        } catch (err) {
            console.log(err)
        }
    }
}

const initialState = {};

export default (state = initialState, action ) => {
    switch ( action.type ) {
        case GOT_MOVIE:
            return action.singleMovie
        default:
            return state
    }
}
