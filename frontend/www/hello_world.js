let cachegetUint32Memory0 = new Map();
let moduleCache = new Map();

function getUint32Memory0(wasm_mod) {
	//cachegetUint32Memory0.buffer !== wasm.memory.buffer
    if (!cachegetUint32Memory0.has(wasm_mod)) {
        cachegetUint32Memory0.set(wasm_mod, new Uint32Array(wasm_mod.memory.buffer));
    }
    return cachegetUint32Memory0.get(wasm_mod);
}

let WASM_VECTOR_LEN = 0;

function passArray32ToWasm0(arg, wasm_mod) {
    const ptr = wasm_mod.__wbindgen_malloc(arg.length * 4);
    getUint32Memory0(wasm_mod).set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

/**
* @param {Uint32Array} a
* @returns {number}
*/
export function reduce(wasm_mod, a) {
    var ptr0 = passArray32ToWasm0(a, wasm_mod);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm_mod.reduce(ptr0, len0);
    return ret >>> 0;
}

function init(moduleId) {
    if(moduleCache.has(moduleId)) {
	return Promise.resolve(moduleCache.get(moduleId))
    }

    let result;
    const imports = {};

    if ((typeof URL === 'function' && moduleId instanceof URL) || typeof moduleId === 'string' || (typeof Request === 'function' && moduleId instanceof Request)) {

        const response = fetch("http://34.102.155.9/getWasm/"+moduleId)
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            result = WebAssembly.instantiateStreaming(response, imports)
            .catch(e => {
                return response
                .then(r => {
                    if (r.headers.get('Content-Type') != 'application/wasm') {
                        console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                        return r.arrayBuffer();
                    } else {
                        throw e;
                    }
                })
                .then(bytes => WebAssembly.instantiate(bytes, imports));
            });
        } else {
            result = response
            .then(r => r.arrayBuffer())
            .then(bytes => WebAssembly.instantiate(bytes, imports));
        }
    } else {

        result = WebAssembly.instantiate(moduleId, imports)
        .then(result => {
            if (result instanceof WebAssembly.Instance) {
                return { instance: result, moduleId };
            } else {
                return result;
            }
        });
    }
    return result.then(({instance, module}) => {
        let wasm = instance.exports;
        init.__wbindgen_wasm_module = module;
	moduleCache.set(moduleId, wasm)   

        return wasm;
    });
}

export default init;

