const router = require('express').Router()
const { models: { Room } } = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let room = await Room.findOne(
      {
        where: {
          status: 'open',
          key: req.body.key
        }
      }
    );
    if (room) res.json(room);
    else res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let newKey = () => {
      let result = '';
      let characters = 'abcdefghijklmnpqrstuvwxyz123456789';
      let charactersLength = characters.length;
      for (var i = 0; i < charactersLength / 8; i++) {
        result += characters.charAt(Math.floor(Math.random() *
          charactersLength));
      }
      return result;
    }
    const newRoom = await Room.create({ status: "open", key: newKey(), userId: req.body.userId });
    res.json(newRoom)
  } catch (err) {
    next(err)
  }
})

router.delete('/:roomId', async (req, res, next) => {
  try {
    const { roomId } = req.params
    const deletedroom = await Room.findByPk(roomId)
    await deletedroom.destroy();
    res.send(deletedroom)
  } catch (err) {
    next(err)
  }
})

router.put('/:roomId', async (req, res, next) => {
  try {
    const { roomId } = req.params
    const updatedRoom = await Room.findByPk(roomId)
    await updatedRoom.update({ status: "closed" })
    res.status(200).send(updatedRoom)
  }
  catch (error) {
    next(error)
  }
})