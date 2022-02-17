import React from "react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleMovieFromIMDb } from '../../store/imdbSingleMovie'
import ReactPlayer from "react-player";
import { fetchRoom } from '../../store/room';
import { motion } from "framer-motion"
import './matchedmovie.css'

const MatchedMovie = (props) => {

    const dispatch = useDispatch();

    const movieId = props.match.params.movieId;

    const recentRoom = useSelector((state) => {
        return state.room
    })

    useEffect(() => {
        dispatch(fetchSingleMovieFromIMDb(movieId));
    }, [])

    const movie = useSelector((state) => {
        return state.singleMovie
    })

    const handleClick = () => {
        dispatch(fetchRoom(recentRoom.key));
    }

    return (
        <div className="single-movie-page">
            <div className="gobackbtn-trailor-div">
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    className='goback-link-div'>
                    <Link to="/room" onClick={handleClick} className='goback-link'>
                        BACH TO ROOM
                    </Link>
                </motion.div>
                <ReactPlayer
                width="100%"
                height="100%"
                    className='react-player'
                    url={movie.videoUrl}
                />
            </div>
            <div className="title-year">
                <p className="single-movie-page-title-year">{movie.title}<br/>{movie.year}</p>
                {/* <p className="single-movie-page-title-year">{movie.year}</p> */}
            </div>
        </div>
    )
}

export default MatchedMovie