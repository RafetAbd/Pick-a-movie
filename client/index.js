import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'
import io from 'socket.io-client';
import { addMatchedMovie } from './store/matchedMovie'
let url;
if (process.env?.DOTENV?.REACT_APP_ENV) {
  url = "http://localhost:1337"
} else {
  url = "https://pick-amovie.herokuapp.com:11257/socket.io/?EIO=4&transport=websocket"
}
const socket = io(url);

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
