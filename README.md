# Idea

Junior is a toolkit & platform to reinvent how business design and support the technology underlying it.

The foundational idea is to extract business logic from the underlying plumping of software architecture. Unlocking greater flexibility for the ownership and understanding of unmodified business logic.

The key word is unmodified; junior technologies uses [WASM](https://webassembly.org/) to unlock this capability.

So stewards of business logic (_Scouts_) will write simple functions that junior aids in compiling into WASM files (_badges_). 

These badges can be run standalone using our platform, or more likely will be integrated into existing technology stack used in the scouts organization. Junior provides a varied toolkit that will aid in this integration. 

The toolkit targets common integeration cases (_councilor_):
  * General Java application (https://github.com/rj-atw/wasm-closure/tree/master/jni-app)  
  * Spark using the JNI councilor  (https://github.com/rj-atw/spark)
  * ... 

## Breakdown of a Badge

## Example of Badges

### Rust

#### variance.wasm
```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn readme() -> String { 
  return String::from("Calculates the variance")
}

#[wasm_bindgen]
pub fn reduce(a: &[u32]) -> u32 { 
  let mean = a.iter().fold(0, |acc, x| acc+x) / (a.len() as u32);  
  
  a.iter().fold(0, |acc, x| acc + (x - mean).pow(2)) / (a.len() as u32)
}

```




## Frontend Prototype

The react.js application is broken into [frontend](https://github.com/rj-atw/gen-wasm/tree/master/frontend) and [backend](https://github.com/rj-atw/gen-wasm/tree/master/backend) directories. The frontend code
is a SPA (single page application) based UI which can be used to both define a new rust based badge; see
a list of already defined badges; and execute badges against an inputed array. The backend directory contains
a nodejs based API which list, dispatches, or compiles and uploads badges used by the UI. The code is 
deployed to a GKE cluster powering the website http://court-of-honor.default.knative.junior.works/.


## Backend Prototype
The cli application is currently hosted in https://github.com/rj-atw/wasm-closure. Just clone and compile the
rust application using ```cargo build```. Then run it by providing the path to an WASM file defining a prototype 
inni as the first argument then a comma seperated array of numbers for the input to the given inni.
