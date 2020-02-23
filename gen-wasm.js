const Docker = require('dockerode')
const fs = require('fs')

const docker = new Docker({host: "localhost", port:"2375"})

//TODO: make async
function compileToWasm(programName, text) {

fs.promises.mkdir('tmp').
  then( () => fs.promises.writeFile('tmp/lib.rs', text)).
  then( () =>  
//docker.run('make-rust', ['bash', '-c', 'uname -a'], process.stdout).then(function(data) {
docker.run('make-rust', [], process.stdout, { ENV: ["prog="+programName,"file=tmp/lib.rs"], HostConfig: { Binds: [
		"C:\\Users\\start\\code\\genWasm:/mnt/input:rw", 
		"C:\\Users\\start\\foo\\www:/mnt/www:rw"
]}})
)
.then(function(data) {
	  var output = data[0];
	  var container = data[1];
	  return container.remove();
}).then(data => console.log('container removed')).
  catch( err => console.log(err))
  .finally( () => fs.promises.rmdir('tmp', {recursive: true}))
}

exports.compileToWasm = compileToWasm
