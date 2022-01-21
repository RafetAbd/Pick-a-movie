const Sequelize = require('sequelize');
const db = require('../db');

const List = db.define('list', {
    status: {
        type: Sequelize.ENUM('active', 'completed')
    }
})

module.exports = List;