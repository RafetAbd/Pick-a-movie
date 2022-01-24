import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRoom } from '../../store/room';
import { motion } from 'framer-motion'

import './newRoom.css';

const NewRoom = () => {

    const recentRoom = useSelector((state) => {
        return state.room
    })

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(fetchRoom(recentRoom.key));
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className='newroom-page'>
            <div className='newroom-label-key-div'>
                <p className='newroom-lable'>Room Key </p>
                <p className='newroom-key'>{recentRoom.key}</p>
            </div>
            <motion.div
                whileHover={{ scale: 1.2 }}
                className='newroom-link-div'>
                <Link to="/room" className='newroom-link' onClick={handleClick}>
                    Join
                </Link>
            </motion.div>
        </motion.div>
    )
}

export default NewRoom