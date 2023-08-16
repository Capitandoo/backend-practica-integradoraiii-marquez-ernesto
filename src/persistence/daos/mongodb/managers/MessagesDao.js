import { msgModel } from "../models/MessagesModel.js";

export default class MessagesDao {

  async getAll() {
    try {
      const response = await msgModel.find({});
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async createMsg(msg) {
    try {
      const response = await msgModel.create(msg);
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async getById(id) {
    try {
      const response = await msgModel.findById(id);
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async updateMsg(id, update) {
    try {
      const response = await msgModel.updateOne ({id: id}, update);
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteMsg(id) {
    try {
      const response = await msgModel.findByIdAndDelete (id);
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteMsgs() {
    try {
      const response = await msgModel.deleteMany ();
    } catch (error) {
      logger.error(error);
    }
  }

};


