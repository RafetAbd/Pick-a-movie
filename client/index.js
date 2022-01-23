import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'
import io from 'socket.io-client';
import { addMatchedMovie } from './store/matchedMovie'

const socket = io('http://localhost:1337');

socket.on('connect', () => {
  console.log('I am now connected to the server!');
  socket.on('other-new-matched-movie', (movie) => {
    // store.dispatch(gotNewMessageFromServer(message));
    store.dispatch(addMatchedMovie(movie));

  });
  socket.on('other-new-channel', (channel) => {
    // store.dispatch(gotNewChannelFromServer(channel));
  })
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
