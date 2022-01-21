const Sequelize = require('sequelize');
const db = require('../db');

const Room = db.define('room', {
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    key: Sequelize.STRING,
})

module.exports = Room;