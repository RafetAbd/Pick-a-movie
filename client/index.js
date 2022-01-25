import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'
import io from 'socket.io-client';
import { addMatchedMovie } from './store/matchedMovie'

const socket = io();

socket.on('connect', () => {
  console.log('I am now connected to the server!');
  socket.on('other-new-matched-movie', (movie) => {

    store.dispatch(addMatchedMovie(movie));
  });
});

export default socket;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
