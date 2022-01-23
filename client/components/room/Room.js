import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Room = () => {

    const recentRoom = useSelector((state) => {
        return state.room
    })



    return (
        <>
        <h1>this is the room component</h1>
            <p>Room Key {recentRoom.key}</p>
        </>
    )

}

export default Room