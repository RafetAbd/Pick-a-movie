import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MatchedMovie = (props) => {
    const dispatch = useDispatch();
    const movieId = props.match.params.movieId;
    console.log(movieId)

    return (
        <div>

        </div>
    )
}

export default MatchedMovie