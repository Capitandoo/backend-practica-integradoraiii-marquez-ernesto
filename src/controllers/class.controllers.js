import { createResponse } from "../utils/utils.js";
import { logger } from "../utils/logger.js";

export default class Controllers {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const items = await this.service.getAll();
      createResponse(res, 200, items);
    } catch (error) {
      logger.error(error);
      next(error.message);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      if (!item)
        createResponse(res, 404, {
          method: "getById",
          error: "Item no encontrado",
        });
      else createResponse(res, 200, item);
    } catch (error) {
      logger.error(error);
      next(error.message);
    }
  };

  create = async (req, res, next) => {
    try {
      const newItem = await this.service.create(req.body);
      if (!newItem)
        createResponse(res, 404, {
          method: "create",
          error: "Error de validación",
        });
      else createResponse(res, 200, newItem);
    } catch (error) {
      logger.error(error);
      next(error.message);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      if (!item)
        createResponse(res, 404, {
          method: "update",
          error: "Item no encontrado!",
        });
      const itemUpd = await this.service.update(id, req.body);
      createResponse(res, 200, itemUpd);
    } catch (error) {
      logger.error(error);
      next(error.message);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      if (!item)
        createResponse(res, 404, {
          method: "delete",
          error: "Item no encontrado!",
        });
      await this.service.delete(id);
      createResponse(res, 200, "Producto eliminado correctamente!");
    } catch (error) {
      logger.error(error);
      next(error.message);
    }
  };
}
