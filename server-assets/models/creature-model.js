let dataAdapter = require('./data-adapter'),
  uuid = dataAdapter.uuid,
  schemator = dataAdapter.schemator,
  DS = dataAdapter.DS;
formatQuery = dataAdapter.formatQuery

let Creature = DS.defineResource({
  name: 'creature',
  endpoint: 'creatures',
  filepath: __dirname + '/../data/creatures.db',
  relations: {
    hasMany: {
      galaxy: [{
        localField: 'galaxies',
        localKeys: 'galaxyIds'
      },
        {
          localField: 'knownGalaxies',
          foreignKeys: 'creatureIds'
        }],
      planet: [{
        localField: 'planets',
        localKeys: 'planetIds'
      },
        {
          localField: 'knownPlanets',
          foreignKeys: 'creatureIds'
        }],
      moon: [{
        localField: 'moons',
        localKeys: 'moonIds'
      },
        {
          localField: 'knownMoons',
          foreignKeys: 'creatureIds'
        }]
    }
  }
})


function create(creature, cb) {
  // Use the Resource Model to create a new Creature
  let creatureObj = {
    name: creature.name,
    id: uuid.v4(),
    galaxyIds: {},
    planetIds: {},
    moonIds: {}
  }
  Creature.create(creatureObj).then(cb).catch(cb)
}

// function inhabitGalaxy(creatureId, galaxyId, cb){
//     DS.find('galaxy', galaxyId).then(function(galaxy){
//         Creature.find(creatureId).then(function(creature){
//             creature.galaxyIds[galaxyId] = galaxyId; 
//             galaxy.creatureIds = galaxy.creatureIds || {}
//             galaxy.creatureIds[creatureId]= creatureId; 

//             Creature.update(creature.id, creature).then(function(){
//                 DS.update('galaxy', galaxy.id, galaxy).then(cb).catch(cb)
//             }).catch(cb)


//         }).catch(cb)
//     }).catch(cb)
// }


function inhabitLocation(creatureId, type, xId, cb) {
  DS.find(type, xId).then(function (habitat) {
    // if(type!== 'galaxy'){ inhabitGalaxy(creatureId, type.galaxyId, cb) }
    Creature.find(creatureId).then(function (creature) {
      creature[type + 'Ids'] = creature[type + 'Ids'] || {}
      creature[type + 'Ids'][xId] = xId;
      habitat.creatureIds = habitat.creatureIds || {}
      habitat.creatureIds[creatureId] = creatureId;

      Creature.update(creature.id, creature).then(function () {
        DS.update(type, xId, habitat).then(cb).catch(cb)
      }).catch(cb)
    }).catch(cb)
  }).catch(cb)


}

function getAll(query, cb) {
  //Use the Resource Model to get all Galaxies
  Creature.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
  // use the Resource Model to get a single Creature by its id
  Creature.find(id, formatQuery(query)).then(cb).catch(cb)
}


module.exports = {
  create,
  getAll,
  getById,
  inhabitLocation
}

