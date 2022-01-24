import axios from 'axios'
import { addMatchedMovie } from './matchedMovie'
const TOKEN = 'token'
import history from "../history";
const ROOM = 'room'
import socket from "../index"

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

// send axios request to backend to create new room.
export const postRoom = () => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem(TOKEN);
            const { data: response } = await axios.post('/api/rooms', {
                headers: {
                    authorization: token,
                },
            });
            dispatch(createNewRoom(response))
        } catch (err) {
            console.log(err)
        }
    }
}

// send axios request to backend to get an existing room.
export const fetchRoom = (key) => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem(TOKEN);
            const { data: response } = await axios.get(`/api/rooms/${key}`, {
                headers: {
                    authorization: token,
                },
            });
            dispatch(gotRoomFromServer(response))
            history.push(`/rooms/${response.key}`)
        } catch (err) {
            console.log(err)
        }
    }
}


// send axios request to backend to add a movie to the room rightSwiped array.
// the response might be a match or just a new add to the room.
export const updateRoom = (roomId, movie) => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem(TOKEN);
            const { data: response } = await axios.put(`/api/rooms/addMovie/${roomId}`, movie, {
                headers: {
                    authorization: token,
                },
            });
            if (typeof (response) === 'object') {
                dispatch(addMatchedMovie(response));
                socket.emit('new-matched-movie', response);
            } else {
                dispatch(addMovieToRoom(response))
            }
        } catch (err) {
            console.log(err)
        }
    }
}


// this thunk creator is not functional yet, for future development.
export const closeRoom = (roomId) => {
    return async (dispatch) => {
        try {
            const { data: response } = await axios.put(`./api/rooms/${roomId}`);
            dispatch(gotRoomFromServer({}));
        } catch (err) {
            console.log(err)
        }
    }
}

const initialState = JSON.parse(window.localStorage.getItem(ROOM)) || {}

export default (state = initialState, action) => {
    switch (action.type) {
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

