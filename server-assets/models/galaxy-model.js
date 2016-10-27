let dataAdapter = require('./data-adapter'),
  uuid = dataAdapter.uuid,
  schemator = dataAdapter.schemator,
  DS = dataAdapter.DS;
  formatQuery = dataAdapter.formatQuery

let Galaxy = DS.defineResource({
  name: 'galaxy',
  endpoint: 'galaxies',
  filepath: __dirname + '/../data/galaxies.db',
  relations: {
    hasMany: {
      star: {
        localField: 'stars',
        foreignKey: 'galaxyId'
      },
      planet: {
        localField: 'planets',
        foreignKey: 'galaxyId'
      },
      moon: {
        localField: 'moons',
        foreignKey: 'galaxyId'
      },
      creature: [{
        localField: 'creatures',
        foreignKeys: 'galaxyIds'
      },
      {
        localField: 'knownCreatures',
        localKeys: 'creatureIds'
      }]
    }
  }
})



function create(name, cb) {
  // Use the Resource Model to create a new galaxy
  let galaxy = { id: uuid.v4(), name: name }
  Galaxy.create(galaxy).then(cb).catch(cb)
}

function getAll(query, cb) {
  //Use the Resource Model to get all Galaxies
  Galaxy.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
  // use the Resource Model to get a single galaxy by its id
  Galaxy.find(id, formatQuery(query)).then(cb).catch(cb)
}

module.exports = {
  create,
  getAll,
  getById
}

