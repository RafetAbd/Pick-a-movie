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
            // console.log(response.key)
            history.push(`/rooms/${response.key}`)
        } catch(err) {
            console.log(err)
        }
    }
}



export const updateRoom = (roomId, movie) => {
    // console.log('roomId', roomId);
    // console.log('movie', movie)
    return async(dispatch) => {
        try {
            const { data: response } = await axios.put(`/api/rooms/addMovie/${roomId}`, movie);
            if ( typeof (response ) === 'object' ) {
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

const initialState = JSON.parse(window.localStorage.getItem(ROOM)) || {}

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

