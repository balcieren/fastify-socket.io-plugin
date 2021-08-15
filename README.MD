# fastify-socket.io-plugin

[![Version](https://img.shields.io/npm/v/fastify-socket.io-plugin.svg)](https://www.npmjs.com/package/fastify-socket.io-plugin)

socket.io for fastify

## Installation

```bash
yarn add fastify-socket.io-plugin
or
npm install fastify-socket.io-plugin
```

## Usage

Register plugin

```js
import fastifySocketIO from "fastify-socket.io-plugin";

fastify.register(fastifySocketIO);
```

If you use with TypeScript , you have to give this type to avoid error

```js
import Fastify, { FastifyInstance } from "fastify";

const fastify: FastifyInstance = Fastify();
```

Socket.io options are available and you can edit them and more [socket.io](https://socket.io/)

```js
fastify.register(fastifySocketIO, {...});
```

Example

```js
fastify.io.on("connect", (socket) => {
  console.log("someone has connected");
});
```

Use with fastify decorate

```js
fastify.get("/", (request, reply) => {
  fastify.io.emit("hello");
});
```

Use with request decorate

```js
fastify.get("/", (request, reply) => {
  request.io.emit("hello");
});
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
