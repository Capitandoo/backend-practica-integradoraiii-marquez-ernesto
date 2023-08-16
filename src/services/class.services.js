import { logger } from "../utils/logger.js";

export default class Services {
  
  constructor(manager) {
    this.manager = manager;
  }

  getAll = async () => {
    try {
      const items = await this.manager.getAll();
      return items;
    } catch (error) {
      logger.error(error);
      throw new Error (error.message);
    }
  };

  getById = async (id) => {
    try {
      const item = await this.manager.getById(id);
      if (!item) return false;
      else return item;
    } catch (error) {
      logger.error(error);
      throw new Error (error.message);
    }
  };

  create = async (obj) => {
    try {
      const newItem = await this.manager.create(obj);
      if (!newItem) return false;
      else return newItem;
    } catch (error) {
      logger.error(error);
      throw new Error (error.message);
    }
  };

  update = async (id, obj) => {
    try {
      let item = await this.manager.getById(id);
      if (!item) {
        return false;
      } else {
        const itemUpdated = await this.manager.update(id, obj);
        return itemUpdated;
      }
    } catch (error) {
      logger.error(error);
      throw new Error (error.message);
    }
  };

  delete = async (id) => {
    try {
      const itemDeleted = await this.manager.delete(id);
      return itemDeleted;
    } catch (error) {
      logger.error(error);
      throw new Error (error.message);
    }
  };
}
