const router = require('express').Router()
const { models: { Room, Movie } } = require('../db')
const { requireToken } = require('./gateKeepingMed')

// route to send a specific room to the frontend.
router.get('/:key', requireToken, async (req, res, next) => {
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

// get all matched movies that has the same room id
router.get('/matchedmovies/:roomId', requireToken, async (req, res, next) => {
  try {
    let matchedMovies = await Movie.findAll({
      where: {
        roomId: req.params.roomId
      }
    })
    res.json(matchedMovies)
  } catch (err) {
    next(err)
  }
})

router.post('/', requireToken, async (req, res, next) => {
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

// this route is not functional yest, for future development.
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
router.put('/addMovie/:roomId', requireToken, async (req, res, next) => {
  try {
    const movieUniqueId = req.body.id
    let room = await Room.findByPk(req.params.roomId);

    // check if the movie is in the array.
    let movieInrightSwiped = room.rightSwiped.filter((item) => item === movieUniqueId);
    if (movieInrightSwiped.length > 0) {

      // if movie in the array, find or add it to the matching movie table
      let [matchedMovie] = await Movie.findOrCreate({
        where: {
          title: req.body.fullTitle,
          movieId: movieUniqueId,
          crew: req.body.crew,
          imageUrl: req.body.image,
          movieRank: req.body.rank,
          roomId: room.id
        }
      })
      res.status(200).send(matchedMovie)
    } else {

      // if the movie is not in the array - add it
      await room.update({
        rightSwiped: [...room.rightSwiped, movieUniqueId]
      })
      room = await Room.findByPk(req.params.roomId);
      res.status(200).send(movieUniqueId)
    }
  } catch (err) {
    next(err)
  }
})

// this route is not functional yet, for future development.
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