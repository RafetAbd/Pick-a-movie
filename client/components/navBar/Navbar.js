import React from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../store'
import { motion } from 'framer-motion'
import './navbar.css'

const Navbar = () => {

  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id
  })

  const userName = useSelector((state) => {
    return state.auth.username
  })


  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout())
  }

  return (

    <motion.nav
    initial={{ y: -250}}
    animate={{ y: 0}}
    transition={{delay: 0.2, type: 'spring', stiffness: 60}}
    >
      {isLoggedIn ? (
        <>
          <Link to="/home" className='logo-link'>
            <p className='logo'>PICK A MOVIE</p>
          </Link>

          {/* The navbar will show these links after you log in */}
          <p className="welcome-user">Welcome {userName}</p>
          <motion.a 
          whileHover={{ scale: 1.2 }}
          href="#" onClick={handleClick} className='logout'>
            Logout
          </motion.a>
        </>
      ) : (
        <>
          <Link to="/home" className='logo-link'>
            <p className='logo'>PICK A MOVIE</p>
          </Link>

          {/* The navbar will show these links before you log in */}
          <Link to="/login" className='login-signup-btn'>Login</Link>
          <Link to="/signup" className='login-signup-btn'>Sign Up</Link>
        </>
      )}
    </motion.nav>
  )
}


export default Navbar;
