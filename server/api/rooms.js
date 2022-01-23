const router = require('express').Router()
const { models: { Room, List, Movie } } = require('../db')


router.get('/:key', async (req, res, next) => {
  try {
    let room = await Room.findOne(
      {
        where: {
          status: 'open',
          key: req.params.key
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
    res.sendStatus(204);
  } catch (err) {
    next(err)
  }
})

// adding movie to rightSwiped array.
router.put('/addMovie/:roomId', async (req, res, next) => {
  try {
    const movieUniqueId = req.body.movieUniqueId
    let room = await Room.findByPk(req.params.roomId);
    let list = await List.findOne(
      {
        where: {
          roomId: room.id
        }
      })

    // check if the movie is in the array.
    let movieInrightSwiped = room.rightSwiped.filter((item) => item === movieUniqueId);
    if (movieInrightSwiped) {
      // if movie in the array, find or add it to the movie table
      let [matchedMovie] = await Movie.findOrCreate({
        where: {
          title: req.body.title,
          movieId: movieUniqueId,
          crew: req.body.crew,
          imageUrl: req.body.imageUrl,
          movieRank: req.body.movieRank,
          listId: list.id
        }
      })
      res.status(200).send(matchedMovie)
    } else {
      // if the movie is not in the array - add it
      await room.update({
        rightSwiped: [...room.rightSwiped, movieUniqueId]
      })
      room = await Room.findByPk(req.params.roomId);
      // res.status(200).send(room)
      res.status(200)
    }
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

module.exports = router