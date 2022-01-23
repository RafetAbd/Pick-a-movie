// const router = require('express').Router()
// const { models: { List, Movie } } = require('../db');
// // const Movie = require('../db/models/Movies');
// module.exports = router

// router.get('/', async (req, res, next) => {
//     try {
//         let list = await List.findOne(
//             {
//                 where: {
//                     roomId: req.body.roomId,
//                     status: 'active'
//                 },
//                 include: Movie
//             }
//         );
//         if (list) res.json(list);
//         else res.sendStatus(404)
//     } catch (err) {
//         next(err)
//     }
// })

// router.post('/', async (req, res, next) => {
//     try {
//         const newList = await List.create({
//             userId: req.body.userId,
//             roomId: req.body.roomId,
//             status: 'active'
//         })
//         res.json(newList)
//     } catch (err) {
//         next(err)
//     }
// })

// router.put('/remove-movie/:movieId', async (req, res, next) => {
//     try {
//         // console.log(req.params.movieId)
//         let list = await List.findOne(
//             {
//                 where: {
//                     userId: req.body.userId,
//                     roomId: req.body.roomId,
//                     status: 'active'
//                 },
//                 include: Movie
//             }
//         );
//         await list.removeMovie(req.params.movieId);
//         list = await List.findOne(
//             {
//                 where: {
//                     userId: req.body.userId,
//                     roomId: req.body.roomId,
//                     status: 'active'
//                 },
//                 include: Movie
//             }
//         );
//         res.status(200).send(list)
//     } catch (err) {
//         next(err)
//     }
// })

// router.put('/remove-all', async (req, res, next) => {
//     try {
//         let list = await List.findOne(
//             {
//                 where: {
//                     userId: req.body.userId,
//                     roomId: req.body.roomId,
//                     status: 'active'
//                 },
//                 include: Movie
//             }
//         );
//         // console.log(Object.getPrototypeOf(list))
//         // list = await List.findOne(
//         //     {
//         //         where: {
//         //             userId: req.body.userId,
//         //             roomId: req.body.roomId,
//         //             status: 'active'
//         //         },
//         //         include: Movie
//         //     }
//         // );
//         res.status(200).send(list)
//     } catch (err) {
//         next(err)
//     }
// })
