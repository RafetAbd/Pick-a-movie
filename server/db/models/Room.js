const Sequelize = require('sequelize');
const db = require('../db');
const List = require('./List');

const Room = db.define('room', {
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    key: Sequelize.STRING,
    rightSwiped: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
})

Room.afterCreate(async(room) => {
    await List.create({roomId: room.id, status: 'active'})
})

module.exports = Room;