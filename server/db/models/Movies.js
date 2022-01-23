const Sequelize = require("sequelize");
const db = require("../db");

const Movie = db.define('movie', {
    title: Sequelize.STRING,
    movieId: Sequelize.STRING,
    movieRank: Sequelize.STRING,
    crew: Sequelize.STRING,
    imageUrl: Sequelize.STRING,
})


module.exports = Movie

