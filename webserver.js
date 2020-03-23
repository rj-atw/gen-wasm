const restify = require('restify')
const genWasm = require('./gen-wasm.js')

function respond(req, res, next) {
  //
}

const server = restify.createServer()
server.use(restify.plugins.bodyParser(
))

const corsMiddleware = require('restify-cors-middleware')
 
const cors = corsMiddleware({
	  preflightMaxAge: 5, //Optional
	  origins: ['http://localhost:8080', 'http://34.102.155.9'],
	  allowHeaders: ['API-Token'],
	  exposeHeaders: ['API-Token-Expiry']
})
 
server.pre(cors.preflight)
server.use(cors.actual)

server.listen(8011, function() {
  console.log('%s listening at %s', server.name, server.url);
})

server.post('/compile', function(req, res, next) {
  console.log('compiling', req.body)
  genWasm.compileToWasm(req.body.program, req.body.content)
  res.send('bar')
})

server.get('/list', function(req, res, next) {
  genWasm.programList().then(listOfPromises => {
    Promise.all(listOfPromises).
            then(list => res.send(list))
  })
})

server.get('/getWasm/:progName', function(req, res, next) {
  genWasm.get(req.params.progName).then(content => res.sendRaw(content))
})
