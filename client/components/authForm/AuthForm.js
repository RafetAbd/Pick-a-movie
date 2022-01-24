import React from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../../store'
import { motion } from 'framer-motion'
import './authForm.css'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.8 }}
    >
      <form onSubmit={handleSubmit} name={name} className='auth-form'>
        <div>
          <label htmlFor="username" className='username-password-label'>
            <p>USERNAME</p>
          </label>
          <input name="username" type="text" className='username-password-input' />
        </div>
        <div>
          <label htmlFor="password" className='username-password-label'>
            <p>PASSWORD</p>
          </label>
          <input name="password" type="password" className='username-password-input' />
        </div>
        <div>
          <motion.button
            whileHover={{ scale: 1.2 }}
            type="submit" className='submit-button'>{displayName}</motion.button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </motion.div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
