'use strict'
const colors = require('colors');
const { db } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')
const seed = require('../script/seed');

const init = async () => {
  try {
    if(process.env.SEED === 'true'){
      await seed();
    }
    else {
      await db.sync()
      console.log('db synced'.rainbow)
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`.cyan))
  } catch (ex) {
    console.log(ex)
  }
}

init()
