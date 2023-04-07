# Astro website with Payload CMS template

Astro SSR as the frontend, served by a fastify server.
Payload CMS run on the same process and also served by the same fastify server.


## Setup

This project uses pnpm and docker-compose for the mongo database.

Create a `.env` file from the `.env.example` template file.

Run `pnpm i`

Then `pnpm dev` to start the development server.


## Build

`pnpm build` to build full app.
