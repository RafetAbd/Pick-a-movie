'use strict'
const colors = require('colors');
const { db } = require('./db')
const PORT = process.env.PORT || 1337
const app = require('./app')
const seed = require('../script/seed');
const socketio = require('socket.io')



const init = async () => {
  try {
    if (process.env.SEED === 'true') {
      await seed();
    }
    else {
      await db.sync()
      console.log('db synced'.rainbow)
    }
    // start listening (and create a 'server' object representing our server)
    const io = socketio(app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`.cyan)))

    io.on('connection', function (socket) {
      console.log(`USER (${socket.id}) has made a persistent connection to the server!`.brightBlue)
      // the next two lines will log if a user disconnect.
      socket.on('disconnect', function () {
        console.log(`USER (${socket.id}) disconnected`.brightRed);
      });
      socket.on('new-matched-movie', function (movie) {
        
        socket.broadcast.emit('other-new-matched-movie', movie); 
      });
    })


  } catch (ex) {
    console.log(ex)
  }
}

init()




