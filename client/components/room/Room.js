import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllMoviesFromIMDb } from '../../store/imdb'
import { motion } from "framer-motion"
import { removeMovie } from '../../store/imdb'
import { updateRoom } from '../../store/room'
import './room.css'

const Room = () => {

    const recentRoom = useSelector((state) => {
        return state.room
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllMoviesFromIMDb());
    }, [])

    const allMovies = useSelector((state) => {
        return state.imdb
    })

    const checkPosition = (xPosition, movie) => {
        if (xPosition < 100) {
            console.log('remove from the list')
            dispatch(removeMovie(movie))
        } else if (xPosition > 900) {
            console.log('add to the backend')
            dispatch(updateRoom(recentRoom.id, movie));
            dispatch(removeMovie(movie))
        } else {
            return
        }
    }

    const matchedMovies = useSelector((state) => {
        return state.matchedMovies
    })

    return (
        <div>
            <h1>this is the room component</h1>
            <p>Room Key {recentRoom.key}</p>
            <div>
                {matchedMovies.map((item) => {
                    return (
                        <div key={item.id}>
                            <img src={item.imageUrl} />
                            <p>title {item.fullTitle}</p>
                            <p>rating {item.imDbRating}</p>
                            <p>crew {item.crew}</p>
                        </div>

                    )
                })}
            </div>
            <div className='all-movies'>
                {allMovies.map((movie) => {
                    return (
                        <motion.div key={movie.id} className='movie-list'
                            drag="x"
                            dragElastic={1}
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={
                                (event, info) => checkPosition(info.point.x, movie)
                                // {
                                //     console.log(info.point.x, info.point.y);
                                //     if (info.point.x < 100) {
                                //         console.log('it will work')
                                //     }
                                // }
                            }
                        // will invoke a function that take (info.point.x) as arg and check
                        // if the 
                        // style={{ x }}
                        >
                            <img src={movie.image} className='movie-pic' />
                            <p>title {movie.fullTitle}</p>
                            <p>rating {movie.imDbRating}</p>
                            <p>crew {movie.crew}</p>
                        </motion.div>
                    )
                })
                }
            </div>
        </div>
    )

}

export default Room