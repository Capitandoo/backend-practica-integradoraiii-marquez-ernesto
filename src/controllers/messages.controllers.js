import {
  getAllService,
  getByIdService,
  createService,
  updateService,
  deleteService,
} from "../services/MessagesService.js";

export const getAllController = async (req, res, next) => {
  try {
    const msg = await getAllService();
    res.json(msg);
  } catch (error) {
    next(error);
  }
};

export const getByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const msg = await getByIdService(id);
    res.json(msg);
  } catch (error) {
    next(error);
  }
};

export const createController = async (req, res, next) => {
  try {
    const {
      user,
      message,
    } = req.body;
    const newDoc = await createService({
      user,
      message,
    });
    res.json(newDoc);
  } catch (error) {
    next(error);
  }
};

export const updateController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      user,
      message,
    } = req.body;
    await getByIdService(id);
    const docUpd = await updateService(id, {
      user,
      message,
    });
    res.json(docUpd);
  } catch (error) {
    next(error);
  }
};

export const deleteController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteService(id);
    res.json({ message: "Mensaje borrado satisfactoriamente!" });
  } catch (error) {
    next(error);
  }
};
