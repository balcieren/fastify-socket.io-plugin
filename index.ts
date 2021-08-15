import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { Server, ServerOptions } from "socket.io";

export {
  Server,
  Socket,
  BroadcastOperator,
  Namespace,
  RemoteSocket,
  ServerOptions,
} from "socket.io";

export type FastifySocketIoOptions = Partial<ServerOptions>;

const socketPlugin: FastifyPluginCallback<FastifySocketIoOptions> = (
  fastify,
  options,
  next
) => {
  if (fastify.io)
    return next(new Error("fastify-socket.io-plugin has been defined before"));

  fastify
    .decorate("io", require("socket.io")(fastify.server, options))
    .decorateRequest("io", fastify.io)
    .addHook("onClose", (_, done) => {
      _.io.close();
      done();
    });

  next();
};

declare module "fastify" {
  interface FastifyInstance {
    io: Server;
  }
  interface FastifyRequest {
    io: Server;
  }
}

const fastifySocketIO = fp(socketPlugin, {
  fastify: "3.x",
  name: "fastify-socket.io-plugin",
});

export default fastifySocketIO;
