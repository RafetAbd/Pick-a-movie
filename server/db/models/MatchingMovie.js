const Sequelize = require("sequelize");
const db = require("../db");

const MatchingMovie = db.define('matchingMovie', {
    name: {
        type: Sequelize.STRING,
        defaultValue: 'No matching yet'
    },
})

module.exports = MatchingMovie


