import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NewRoom = () => {

    const recentRoom = useSelector((state) => {
        return state.room
    })


    return (
        <>
            <p>Room Key</p>
            {recentRoom.key}
            <Link to="/room">
                Join
            </Link>
        </>
    )
}

export default NewRoom