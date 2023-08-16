import Controllers from "./class.controllers.js";
import ProductService from "../services/product.services.js";
import { logger } from "../utils/logger.js";

const productService = new ProductService();

export default class ProductController extends Controllers {
  constructor() {
    super(productService);
  }  

  createMocksProducts = async (req, res, next) => {
    try {
      const response = await productService.createMocksProducts();
      res.status(200).json({ products: response });
    } catch (error) {
      logger.error(error);
      next (error.message);
    }
  };
  
  createProduct = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { ...body } = req.body;
      const product = {...body, status: true, owner: userId};
      //const thumbnails = files.map ((file) => file.originalname);
      const response = await productService.saveProduct(product);
      res.send (response);
    } catch (error) {
      logger.error(error);
      next (error.message);
    }
  }

  deleteProduct = async (req, res, next) => {
    const { userId, role } = req.user;
    const id = req.params.id;
    if(role === "premium") { 
      let response = await productService.getProduct(id);
      if(response.owner.toString() !== userId) {
        return res.status(401).send({ error: 'You do not have permissions to perform this action'})
      }
    }
    let response = await productService.deleteProduct(id);
    res.send(response);
  };

}

/*export const getAllController = async (req, res, next) => {
  try {
    const { page, limit, key, value, sortField, sortOrder } = req.query;
    const allProducts = await getAllService (page, limit, key, value, sortField, sortOrder);
    const nextLink = allProducts.hasNextPage ? `http://localhost:8080/products?page=${allProducts.nextPage}` : null
    const prevLink = allProducts.hasPrevPage ? `http://localhost:8080/products?page=${allProducts.prevPage}` : null
    res.json ({
      results: allProducts.docs,
      info: {
          count: allProducts.totalDocs,
          pages: allProducts.totalPages,
          actualPage: allProducts.page,
          hasPrevPage: allProducts.hasPrevPage,
          hasNextPage: allProducts.hasNextPage,
          nextPageLink: nextLink,
          prevPageLink: prevLink
    }
  });
  } catch (error) {
    next(error);
  }
};

export const getByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await getByIdService(id);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const createController = async (req, res, next) => {
  try {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;
    const newDoc = await createService({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
    });
    res.json(newDoc);
  } catch (error) {
    next(error);
  }
};

export const updateController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;
    await getByIdService(id);
    const docUpd = await updateService(id, {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
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
    res.json({ message: "Producto borrado satisfactoriamente!" });
  } catch (error) {
    next(error);
  }
};*/
