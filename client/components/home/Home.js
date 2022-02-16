import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { postRoom } from '../../store/room'
import { openModal } from "../../store/modal";
import { motion } from 'framer-motion'

import Modal from '../modal/Modal'
import './home.css'

/**
 * COMPONENT
 */
const Home = () => {

  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id
  })

  const dispatch = useDispatch();

  const createRoom = () => {
    dispatch(postRoom())
  }

  const open = () => {
    dispatch(openModal());
  };

  return (
    <div>
      <Modal />
      {isLoggedIn ? (
        <div className='landing-page-afterlogin-whole'>
          <div className='landing-page-after-login-left-part'>
            {/* The home page will show these links after you log in */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className='landing-page-after-login'
            >
              <Link to="/newroom" onClick={() => createRoom()} className='create-room-link'>Create a new room</Link>
              <button onClick={() => open()} className='join-room-btn'>Join Room</button>
            </motion.div>
            {/* <p className='fotter-line'>2022 &copy; Rafet Abdalgalil. All rights reserved. <a href='https://github.com/RafetAbd/Pick-a-movie' className='github-link' target="_blank">
              github
            </a>
            </p> */}
          </div>
          <div className='landing-page-pic-div-after-login'>
            <img src='/home-page-poster.jpeg' className='landing-page-pic' />
          </div>
          <div className='footer-div'>
            <p className='fotter-line'>2022 &copy; Rafet Abdalgalil. All rights reserved. <a href='https://github.com/RafetAbd/Pick-a-movie' className='github-link' target="_blank">
              github
            </a>
              <a href='https://www.linkedin.com/in/rafet-abdalgalil-46606a1a1/' className='github-link' target="_blank">
                linkedin
              </a>
            </p>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className='landing-page-before-login'>
          {/* The navbar will show this message before you log in */}
          {/* <h3>this is the landing page before login</h3> */}
          <div className='l-p-b-l-f'>
            <div className='main-page-phrases'>
              <p className='next-movie'>NEXT MOVIE TO WATCH </p>
              <p className='landing-page-text'>
                HAVE YOU EVER WASTED A LOT OF TIME
                DECIDING WHICH MOVIE TO WATCH WITH
                A FRIEND OR LOVED ONES ?
                IF YES, THEN
                YOU ARE IN THE RIGHT PLACE. LOGIN OR
                CREATE AN ACCOUNT AND INVITE OTHERS
                TO DECIDE TOGETHER WHICH MOVIE TO SEE
                NEXT.
              </p>
              {/* <div > */}

              {/* </div> */}
            </div>
            {/* <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> */}
            <div className='landing-page-pic-div'>
              <img src='/home-page-poster.jpeg' className='landing-page-pic' />
            </div>
          </div>
          <div className='footer-div'>
            <p className='fotter-line'>2022 &copy; Rafet Abdalgalil. All rights reserved. <a href='https://github.com/RafetAbd/Pick-a-movie' className='github-link' target="_blank">
              github
            </a>
              <a href='https://www.linkedin.com/in/rafet-abdalgalil-46606a1a1/' className='github-link' target="_blank">
                linkedin
              </a>
            </p>
          </div>
        </motion.div>

      )}

    </div>
  )
}



export default Home;
