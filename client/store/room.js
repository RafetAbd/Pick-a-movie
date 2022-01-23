import axios from 'axios'
const TOKEN = 'token'
import history from "../history";

const CREATE_ROOM = 'CREATE_ROOM';
const GOT_ROOM = 'GOT_ROOM';
const UPDATE_ROOM = 'UPDATE_ROOM';

export const createNewRoom = (room) => {
    return {
        type: CREATE_ROOM,
        room
    }
}

export const gotRoomFromServer = (room) => {
    return {
        type: GOT_ROOM,
        room
    }
}

export const addMovieToRoom = (movieId) => {
    return {
        type: UPDATE_ROOM,
        movieId
    }
}

export const postRoom = () => {
    return async(dispatch) => {
        try {
            const { data: response } = await axios.post('/api/rooms');
            dispatch(createNewRoom(response))
        } catch(err) {
            console.log(err)
        }
    }
}

export const fetchRoom = (key) => {
    return async (dispatch) => {
        try {
            const { data: response } = await axios.get(`/api/rooms/${key}`);
            dispatch(gotRoomFromServer(response))
            console.log(response.key)
            history.push(`/rooms/${response.key}`)
        } catch(err) {
            console.log(err)
        }
    }
}



export const updateRoom = (roomId, movieId) => {
    return async(dispatch) => {
        try {
            const { data: response } = await axios.put(`./api/rooms/addmovie/${roomId}`, movieId);
            // dispatch(addMovieToRoom());
            // ^^^^^^^ need to  pass something to the funnction
            // the response has to be the movie id !!!!
        } catch (err) {
            console.log(err)
        }
    }
}

export const closeRoom = (roomId) => {
    return async(dispatch) => {
        try {
            const { data: response } = await axios.put(`./api/rooms/${roomId}`);
            dispatch(gotRoomFromServer({}));
        } catch (err) {
            console.log(err)
        }
    }
}

const initialState = {}

export default (state = initialState, action ) => {
    switch(action.type) {
        case CREATE_ROOM:
            return action.room;
        case GOT_ROOM:
            return action.room;
        case UPDATE_ROOM:
            return { ...state, rightSwiped: [...state.rightSwiped, action.movieId] }
        default:
            return state
    }
}

