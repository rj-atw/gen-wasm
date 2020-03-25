From rust

COPY build.sh /tmp/.
RUN sh -x ./tmp/build.sh

WORKDIR /srv/make-rust-wasm
COPY Cargo.toml /srv/make-rust-wasm
RUN mkdir -p /srv/make-rust-wasm/src
RUN touch /srv/make-rust-wasm/src/lib.rs
RUN wasm-pack build --target web


RUN mkdir -p /srv/node-app/src
WORKDIR /srv/node-app
COPY *.js /srv/node-app/
COPY package.json /srv/node-app
COPY Cargo.toml /srv/node-app

RUN mkdir -p /home/rj/.gcloud
COPY key.json /home/rj/.gcloud

CMD /bin/bash -c ". ~/.bashrc && npm i && node webserver.js"
