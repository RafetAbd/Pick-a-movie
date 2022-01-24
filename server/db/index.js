//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Room = require('./models/Room')
const Movie = require('./models/Movies');

//associations could go here!

User.hasMany(Room);
Room.belongsTo(User);

Room.hasMany(Movie);
Movie.belongsTo(Room)

module.exports = {
  db,
  models: {
    User,
    Movie,
    Room
  },
}
