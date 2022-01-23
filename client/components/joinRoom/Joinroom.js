import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from "react-router-dom";
import { closeModal } from '../../store/modal'
import { fetchRoom } from '../../store/room'

const JoinRoom = () => {

    const recentRoom = useSelector((state) => {
        return state.room
    })

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchRoom(e.target.roomkey.value));
        dispatch(closeModal());
    }

    return (
        <>
        <h4 className="join-room">this is join room component inside modal</h4>
        <form  onSubmit={(e) => handleSubmit(e)}>
                    
                        <label htmlFor="roomkey">Room Key</label>
                        <input name='roomkey' type="text" placeholder="# e.g. 4rn8d"/>
                   
                        <button type="submit" >Join</button>
                   
                </form>

        
        </>
    )
}

export default JoinRoom