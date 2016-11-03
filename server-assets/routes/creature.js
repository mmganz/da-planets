const router = require('express').Router();
const Creature = require('../models/creature-model');

module.exports.mountPath = '/creatures'
module.exports.router = router;

router.route('/:id?')
  .get(function (req, res, next) {
    if (req.params.id) {
      Creature.getById(req.params.id, req.query.include, function (creature) {
        if(creature.stack) { return next(creature) }
        return res.send(creature)
      })
    } else {
      Creature.getAll(req.query.include, function (creatures) {
        if(creatures.stack) { return next(creatures) }
        return res.send(creatures);
      });
    }
  })
  .post(function (req, res, next) {
    Creature.create(req.body, function (creature) {
      if(creature.stack) { return next(creature) }
      return res.send(creature)
    })
  })
  .put(function (req, res, next) {
<<<<<<< HEAD
      Creature.inhabitLocation(req.params.id, req.body.type, req.body.id, function(creature){
          if(creature.stack) { return next(creature) }
         return res.send(creature)
      })
  })
  .delete(function (req, res, next) {
    res.send('We are working on it....')
  })
=======
    Creature.inhabitGalaxy(req.params.id, req.body.galaxyId, function(creature){
      if(creature.stack) { return next(creature) }
      return res.send(creature)
    })
  })
  .delete(function (req, res, next) {
    res.send('We are working on it....')
  })
>>>>>>> 8875a91c6ca0ddc204cde196c8b25d0fa478b5ed
