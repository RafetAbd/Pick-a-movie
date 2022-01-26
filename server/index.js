'use strict'
const colors = require('colors');
const { db } = require('./db')
// const PORT = process.env.PORT
const app = require('./app')
const seed = require('../script/seed');
const socketio = require('socket.io')


// console.log(process.env.PORT);
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
    const io = socketio(app.listen(process.env.PORT, () => console.log(`Listening on http://localhost:${process.env.PORT}`.cyan)))

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




