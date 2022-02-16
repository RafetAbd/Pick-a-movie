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
        <div className='auth-form-input' >
        {error && error.response && <div className='error-div'> {error.response.data} </div>}

          <div className='username-password-divs'>
            <label htmlFor="username" className='username-password-label'>
              <p>EMAIL</p>
            </label>
            <input name="username" type="text" id='username-input' />
          </div>
          <div className='username-password-divs'>
            <label htmlFor="password" className='username-password-label'>
              <p>PASSWORD</p>
            </label>
            <input name="password" type="password" id='password-input' />
          </div>
          <div className='username-password-divs'>
            <motion.button
              whileHover={{ scale: 1.2 }}
              type="submit" className='submit-button'>{displayName}</motion.button>
          </div>
        </div>
        <div className='testing-div'>
          <p >
            For Testing use email <br />
            cody@mail.com or lisa@mail.com <br />
            the password is 123.<br />
            Also, feel free to create your own account.
          </p>
        </div>

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
