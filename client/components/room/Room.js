import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllMoviesFromIMDb } from '../../store/imdb'
import { motion } from "framer-motion"
import { removeMovie } from '../../store/imdb'
import { updateRoom } from '../../store/room'
import { fetchMatchedMovies } from '../../store/matchedMovie'
const ROOM = 'room';
import './room.css'

const Room = () => {

    const recentRoom = useSelector((state) => {
        return state.room
    })

    const dispatch = useDispatch();

    useEffect(() => {
        window.localStorage.setItem(ROOM, JSON.stringify(recentRoom));
    }, [recentRoom]);

    useEffect(() => {
        dispatch(fetchAllMoviesFromIMDb());
    }, [])

    const allMovies = useSelector((state) => {
        return state.imdb
    })

    const checkPosition = async (xPosition, movie) => {
        if (xPosition < 100) {
            console.log('remove from the list')
            await dispatch(removeMovie(movie))
        } else if (xPosition > 900) {
            console.log('add to the backend')
            dispatch(updateRoom(recentRoom.id, movie));
            dispatch(removeMovie(movie))
        } else {
            return
        }
    }

    useEffect(() => {
        dispatch(fetchMatchedMovies(recentRoom.id));
    }, [])

    const matchedMovies = useSelector((state) => {
        return state.matchedMovies
    })

    return (
        <motion.div>
            <p className='room-key-inside-room'>Room Key {recentRoom.key}</p>
            <div className='matched-movies-list-in-room'>
                {matchedMovies.map((item) => {
                    return (
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            key={item.id} className='single-movie-div'>

                            <Link to={`/matchedmovie/${item.movieId}`} className='single-movie-link'>
                                <img src={item.imageUrl} />
                                <p className='single-movie-link-title'>{item.title}</p>
                            </Link>

                        </motion.div>
                    )
                })}
            </div>
            <div className='all-movies'>
                {allMovies.map((movie) => {
                    return (
                        <motion.div key={movie.id} className='movie-list'
                            whileHover={{ scale: 1.2 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={
                                (event, info) => checkPosition(info.point.x, movie)
                            }
                            style={{ position: 'absolute', zIndex: 200 - movie.id || 1 }}
                        >
                            <img src={movie.image} className='movie-pic' />
                            <div className='movie-list-p'>
                                <p className='movie-list-p-title'> {movie.fullTitle}</p>
                                <p>rating: {movie.imDbRating}</p>
                                <p>crew: {movie.crew}</p>
                            </div>
                        </motion.div>
                    )
                })
                }
            </div>
        </motion.div>
    )

}

export default Room