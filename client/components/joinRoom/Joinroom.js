import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from "react-router-dom";
import { closeModal } from '../../store/modal'
import { fetchRoom } from '../../store/room'
import { motion } from "framer-motion";
import './joinRoom.css'

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

    const close = () => {
        dispatch(closeModal())
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)} className="join-a-room-div">

                <label htmlFor="roomkey" className="room-key">Room Key</label>
                <input name='roomkey' type="text" id="roomkey-input" />

                <motion.button
                    whileHover={{ scale: 1.3 }}
                    type="submit" className="submit-cancel-joinroom-button">Join</motion.button>
                <motion.button
                    whileHover={{ scale: 1.3 }}
                    onClick={() => close()} className="submit-cancel-joinroom-button" style={{ textDecoration: 'none' }}>
                    Cancel
                </motion.button>
            </form>
        </>
    )
}

export default JoinRoom