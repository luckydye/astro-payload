import { resolve } from "path";
import payload from "payload";
import payloadConfig from "./payload.config";
import type { Express } from "express";

export function init(app: Express) {
  if (!process.env.PAYLOAD_CONFIG_PATH) {
    process.env.PAYLOAD_CONFIG_PATH = resolve("../../packages/cms/payload.config.ts");
  }

  // Initialize Payload
  payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    mongoOptions: {
      authSource: process.env.MONGODB_AUTHDB,
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASS,
    },
    express: app,
    config: payloadConfig,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });
}
