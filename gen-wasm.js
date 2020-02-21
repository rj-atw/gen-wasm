const Docker = require('dockerode')

const docker = new Docker({host: "localhost", port:"2375"})

//docker.run('make-rust', ['bash', '-c', 'uname -a'], process.stdout).then(function(data) {
docker.run('make-rust', [], process.stdout, { ENV: ["prog=w","file=lib.rs"], HostConfig: { Binds: [
		"C:\\Users\\start\\code\\variance:/mnt/input:rw", 
		"C:\\Users\\start\\foo\\www:/mnt/www:rw"
]}}
)
.then(function(data) {
	  var output = data[0];
	  var container = data[1];
	  return container.remove();
}).then(function(data) {
	  console.log('container removed');
}).catch(function(err) {
	  console.log(err);
})
