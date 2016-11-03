let express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  routes = require('./server-assets/routes/index'),
  handlers = require('./utils/handlers'),
  server = express(),
  port = process.env.PORT || 1582;
  // var http = require('http').Server(server)
  // var io = require('socket.io')(http),
  // Planet = require('./server-assets/models/planet-model');

//Registers Middleware for server
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use('/', express.static(`${__dirname}/public/planets/`));
server.use('/api', cors(handlers.corsOptions), routes.router)
server.use('/', handlers.defaultErrorHandler)



// io.on('connection', function(socket){
// console.log('a user connected');
// socket.emit('hello', {turtle: ['meredith']})

  // socket.on('GIVEMEPLANETS', function(){
  //   Planet.getAll({}, function(planets){
  //     socket.emit('PLANETSRECIEVED', planets)
  //   })
  // })
  // })


server.listen(port, function () {
  console.log(`Creating worlds on port: ${port}`);
})