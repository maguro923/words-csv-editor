FROM node:20.18.0

#install git
RUN apt-get update && apt-get install -y git

WORKDIR /app

#install npm package based on packages.json
COPY package.json ./
RUN npm install

RUN apt-get install -y curl

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

ENV PATH=/root/.cargo/bin:$PATH

ENV CARGO_BUILD_TARGET_DIR=/tmp/target

RUN cargo install wasm-pack