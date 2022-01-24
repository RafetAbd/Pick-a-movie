import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import room from './room'
import modal from './modal'
import imdb from './imdb'
import matchedMovies from './matchedMovie'
import singleMovie from './imdbSingleMovie'

const reducer = combineReducers({ 
  auth,
  room,
  modal,
  imdb,
  matchedMovies,
  singleMovie
 })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
