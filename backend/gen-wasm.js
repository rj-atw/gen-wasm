const util = require('util')
const exec = util.promisify(require('child_process').exec)

const Docker = require('dockerode')
const fs = require('fs')

const {Storage} = require('@google-cloud/storage')
const storage = new Storage({keyFilename: '/home/rj/.gcloud/key.json'})

const bucketName = "gs://rjjr-test-wasm-uploads"

const docker = new Docker({host: "localhost", port:"2375"})

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true })

function getStringFromWasm0(mem, ptr, len) {
  return cachedTextDecoder.decode(mem.subarray(ptr, ptr + len)) 
}

function getReadme(file) {
  return file.download().
     then(content => WebAssembly.instantiate(new Uint8Array(content[0]))).
     then(wasm => {

       wasm.instance.exports.readme.call(8)
       const mem8Aligned = new Uint8Array(wasm.instance.exports.memory.buffer)
       const mem32Aligned = new Int32Array(wasm.instance.exports.memory.buffer)

       const offset = mem32Aligned[0]
       const length = mem32Aligned[1]

       return getStringFromWasm0(mem8Aligned, offset, length)
     })
}

function programList() {
  /* TODO Handle files in bucket with less wrapping */
  return storage.bucket(bucketName).getFiles().then(filesWrap => { 
   const [files] = filesWrap
   return files.filter(name => name.name.endsWith("wasm"))
	.map(file => {
          return getReadme(file).then(readme => {  
            return { name: file.name, readme: readme }
          })
        })
  })
}

//TODO: make async
function compileToWasm(programName, text) {
    fs.promises.writeFile('/srv/node-app/src/lib.rs', text).
    then( () =>  exec('wasm-pack build --target web && cp /srv/node-app/pkg/hello_world_bg.wasm /tmp/'+programName+'.wasm')).
    then(data => { 
      const fileName = '/tmp/'+programName+'.wasm' 
      console.log(fileName)
      return storage.bucket(bucketName).upload(fileName)
    }) 
}

function get(programName) {
  return storage.bucket(bucketName).file(programName).download().then(respArray => respArray[0])
}

exports.compileToWasm = compileToWasm
exports.programList = programList
exports.get = get
