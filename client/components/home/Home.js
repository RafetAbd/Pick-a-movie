import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { postRoom } from '../../store/room'
import { openModal } from "../../store/modal";
import Modal from '../modal/Modal'

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
        <div>
          
          {/* The home page will show these links after you log in */}
          <h3>this is the landing page after login</h3>
          <Link to="/newroom" onClick={() => createRoom()}>Create a room</Link>
          <button onClick={() => open()}>Join Room</button>

          {/* <Link to="/room">Join one</Link> */}
        </div>
      ) : (
        <div>
          {/* The navbar will show this message before you log in */}
          <h3>this is the landing page before login</h3>
          {/* <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> */}
        </div>
      )}
      
    </div>
  )
}



export default Home;
