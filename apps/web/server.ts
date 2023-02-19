import path from "path";
import express, { Request, Response } from "express";
import http from "http";

import { NodeApp as AstroApp } from "astro/app/node";
import { init as initPayload } from "cms";

export function start(manifest) {
  console.log("startup...");

  const astro = new AstroApp(manifest);

  const app = express();
  const server = http.createServer(app);

  initPayload(app);

  app.use("/", async (request: Request, res: Response) => {
    if (astro.match(request)) {
      const response = await astro.render(request);
      return res.status(response.status).send(await response.text());
    }
    request.next();
  });

  // Add your own express routes here

  app.use("/", express.static(path.resolve("./dist/public")));

  const PORT = process.env.PORT || 3000;
  server.listen(PORT);

  process.stdin.resume();
}
