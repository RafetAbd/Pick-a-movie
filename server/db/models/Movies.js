const Sequelize = require("sequelize");
const db = require("../db");

const Movie = db.define('movie', {
    title: {
        type: Sequelize.STRING
    },
})


module.exports = Movie

