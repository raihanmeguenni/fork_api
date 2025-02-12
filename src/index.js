import "dotenv/config";
import Fastify from "fastify";
import { getApiMovies } from "./getApiMovies.js";
import { getApiWatchlist } from "./getApiWatchlist.js";
import { postAddToWatchlist } from "./postAddToWatchlist.js";
import { postRemoveFromWatchlist } from "./removeFromWatchlist.js";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUi from "@fastify/swagger-ui";

const fastify = Fastify({
  logger: true,
});

await fastify.register(FastifySwagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "Test swagger",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
  },
});

await fastify.register(FastifySwaggerUi, {
  routePrefix: "/",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
});

fastify.get(
  "/api/movies",
  {
    schema: {
      description: "Get or search movies",
      tags: ["movies"],
      summary: "Get or search movies",
      query: {
        type: "object",
        properties: {
          title: { type: "string", description: "Title of the movie" },
        },
      },
      response: {
        200: {
          description: "Successful response",
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              original_title: { type: "string" },
              id: { type: "string" },
            },
          },
        },
        default: {
          description: "Default response",
          type: "object",
          properties: {
            foo: { type: "string" },
          },
        },
      },
    },
  },
  getApiMovies
);
fastify.get("/api/watchlist", getApiWatchlist);
fastify.post("/api/watchlist", postAddToWatchlist);
fastify.delete("/api/watchlist", postRemoveFromWatchlist);
fastify.listen(
  {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
  },
  function (err) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }
);

console.log(process.env.RENDER_EXTERNAL_URL);
