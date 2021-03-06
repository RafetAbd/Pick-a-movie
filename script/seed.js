'use strict'
const colors = require('colors');
const { db, models: {
  User,
  Movie,
  Room
},
} = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!'.rainbow)

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody@mail.com", password: "123" }),
    User.create({ username: "murphy@mail.com", password: "123", }),
    User.create({ username: "lucy@mail.com", password: "123", }),
    User.create({ username: "john@mail.com", password: "123", }),
    User.create({ username: "stacie@mail.com", password: "123", }),
    User.create({ username: "kim@mail.com", password: "123", }),
    User.create({ username: "eric@mail.com", password: "123", }),
    User.create({ username: "mmike@mail.comike", password: "123", }),
    User.create({ username: "jenn@mail.com", password: "123", }),
    User.create({ username: "tom@mail.com", password: "123", }),
    User.create({ username: "lisa@mail.com", password: "123", }),
  ])

  console.log(`seeded ${users.length} users`.green)
  // console.log(`seeded ${rooms.length} rooms`.green)
  // console.log(`seeded ${movies.length} selectedMovies`.green)
  console.log(`seeded successfully`.cyan)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...'.blue)
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection'.green)
    await db.close()
    console.log('db connection closed'.green)
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
