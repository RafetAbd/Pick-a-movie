//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');

const List = require('./models/List')
const Room = require('./models/Room')
const Movie = require('./models/Movies');

//associations could go here!

User.hasMany(Room);
Room.belongsTo(User);

// Room.HasOne(List);
// List.belongsTo(Room);

// User.hasMany(Room);
// Room.belongsToMany(User, {
//   through: List,
//   foreignKey: "userId",
// });

Room.hasMany(Movie);
Movie.belongsTo(Room)

module.exports = {
  db,
  models: {
    User,
    List,
    Movie,
    Room
  },
}
