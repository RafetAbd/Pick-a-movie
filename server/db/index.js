//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');

const List = require('./models/List')
const Room = require('./models/Room')
const Movie = require('./models/Movies');

//associations could go here!

User.hasMany(Room);
Room.belongsTo(User);

Room.hasMany(List);
List.belongsTo(Room);

// User.hasMany(Room);
// Room.belongsToMany(User, {
//   through: List,
//   foreignKey: "userId",
// });

List.hasMany(Movie);
// SelectedMovie.belongsTo(List);

module.exports = {
  db,
  models: {
    User,
    List,
    Movie,
    Room
  },
}
