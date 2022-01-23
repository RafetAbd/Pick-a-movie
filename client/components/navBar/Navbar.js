import React from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../store'

const Navbar = () => {

  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id
  })

  const userName = useSelector((state) => {
    return state.auth.userName
  })

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout())
  }

  return (
    <div>
      <h1>pick a movie</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <p className="welcome-user">Welcome {userName}</p>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}


export default Navbar;
