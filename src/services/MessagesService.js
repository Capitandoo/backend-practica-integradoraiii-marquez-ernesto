import MessagesDao from "../persistence/daos/mongodb/managers/MessagesDao.js";
import MessageManager from "../persistence/daos/filesystem/managers/MessagesDao.js";
import { pathMessages } from '../path.js';
import { logger } from "../utils/logger.js";

const messagesDao = new MessagesDao ();
//const messagesDao = new MessageManager (pathMessages);

export const getAllService = async () => {
  try {
    const msgs = await messagesDao.getAll ();
    return msgs;
  } catch (error) {
    logger.error(error);
  }
};

export const getByIdService = async (id) => {
  try {
    const msgs = await messagesDao.getById(id);
    if (!msgs) throw new Error("Mensaje no encontrado");
    else return msgs;
  } catch (error) {
    logger.error(error);
  }
};

export const createService = async (msgs) => {
  try {
    const newMsg = await messagesDao.createMsg(msgs);
    if (!newMsg) throw new Error("Error de validacion!");
    else return newMsg;
  } catch (error) {
    logger.error(error);
  }
};

export const updateService = async (id, update) => {
  try {
    const msgs = await messagesDao.getById(id);
    if (!msgs) {
      throw new Error("Mensaje no encontrado");
    } else {
      const msgUpd = await messagesDao.updateMsg(id, update);
      return msgUpd;
    }
  } catch (error) {
    logger.error(error);
  }
};

export const deleteService = async (id) => {
  try {
    const msgDel = await messagesDao.deleteMsg(id);
    return msgDel;
  } catch (error) {
    logger.error(error);
  }
};
