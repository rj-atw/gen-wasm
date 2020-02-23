const restify = require('restify')
const genWasm = require('./gen-wasm.js')

function respond(req, res, next) {
  //
}

const server = restify.createServer()
server.use(restify.plugins.bodyParser(
))

server.listen(8011, function() {
  console.log('%s listening at %s', server.name, server.url);
})

server.post('/compile', function(req, res, next) {
  console.log('compiling', req.body)
  genWasm.compileToWasm(req.body.program, req.body.content)
  res.send('bar')
})
