import tap from "tap";
import Fastify from "fastify";
import fastifySocketIO from "../index";

const buildApp = async (t: Tap.Test) => {
  const fastify = Fastify({ logger: { level: "error" } });

  t.teardown(() => {
    fastify.close();
  });

  return fastify;
};

tap.test("fastify-socket.io plugin test", async (t) => {
  t.test("without options", async (t) => {
    const fastify = await buildApp(t);

    try {
      await fastify.register(fastifySocketIO);
      t.ok("io" in fastify, "plugin should be register");
    } catch (error) {
      console.log(error);
      t.error(error);
    }
  });

  t.test("with options", async (t) => {
    const fastify = await buildApp(t);

    try {
      await fastify.register(fastifySocketIO, { path: "/socket" });

      t.same(fastify.io.path(), "/socket", "should be same");
    } catch (error) {
      console.log(error);
      t.error(error);
    }
  });
});
