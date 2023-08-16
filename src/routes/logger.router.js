import { Router } from "express";
import { logger } from "../utils/logger.js";

const router = Router();

router.get("/", (req, res) => {
  logger.debug("Mensaje de prueba en nivel debug");
  logger.http("Mensaje de prueba en nivel http");
  logger.info("Mensaje de prueba en nivel info");
  logger.warning("Mensaje de prueba en nivel warn");
  logger.error("Mensaje de prueba en nivel error");
  logger.fatal("Mensaje de prueba en nivel fatal");
  res.send("Prueba Realizada");
});

export default router;
