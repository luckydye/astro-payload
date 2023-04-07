import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import { App } from "astro/app";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyExpress from "@fastify/express";
import payload from "payload";
import payloadConfig from "./payload.config";

async function startServer() {
  const server = Fastify({ logger: true });

  await server
    .register(fastifyStatic, {
      root: fileURLToPath(new URL("../client", import.meta.url)),
    })
    .register(fastifyExpress);

  return server;
}

function startPayload() {
  const app = express.Router();
  if (!process.env.PAYLOAD_SECRET) throw new Error("missing env var 'PAYLOAD_SECRET'");
  if (!process.env.DB_URI) throw new Error("missing env var 'DB_URI'");

  // Initialize Payload
  payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.DB_URI,
    mongoOptions: {
      user: process.env.DB_ROOT_USER,
      pass: process.env.DB_ROOT_PASS,
      dbName: process.env.DB_NAME,
    },
    express: app,
    config: payloadConfig,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  return app;
}

export async function dev(astro: { server: { httpServer: http.Server } }) {
  const app = express();

  const router = await startPayload();
  app.use(router);

  // use the astro server for both request handlers
  const server = astro.server.httpServer;
  const listeners = server.listeners("request");
  const astroListener = listeners[0];

  // @ts-ignore
  server.off("request", astroListener);
  server.on("request", (req, res) => {
    if (req.url?.match("/admin") || req.url?.match("/api") || req.url?.match("__webpack_hmr")) {
      app(req, res);
    } else {
      astroListener(req, res);
    }
  });
}

export async function start(manifest) {
  // prod entry
  const app = new App(manifest);

  const server = await startServer();

  const payloadRouter = startPayload();
  server.use(payloadRouter);

  server.use(async (req, res) => {
    const request = new Request("http://localhost:3000" + req.url);
    if (app.match(request)) {
      const response = await app.render(request);
      return await response.text();
    }
  });

  server.listen({ host: process.env.HOST, port: +(process.env.PORT || 3000) });
}
