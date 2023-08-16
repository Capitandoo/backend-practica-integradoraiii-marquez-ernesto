import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
import ProductRepository from "../persistence/daos/repository/product.repository.js";
import { generateProduct } from "../utils/utils.js";

const {productManager} = factory;
const productRepository = new ProductRepository();

export default class ProductService extends Services {
  constructor() {
    super (productManager)
  }

  getProducts = async (limit, page, query, sort, key, value) => {
    const getProds = await productRepository.getProducts (parseInt(limit), page, query, sort, key, value);
    return getProds;
  };

  getProduct = async (id) => {
    const getProd = await productRepository.getProduct(id);
    return getProd;
  };

  saveProduct = async (product) => {
    const saveProd = await productRepository.addProduct(product);
    return saveProd;
  };

  deleteProduct = async (id) => {
    const delProd = await productRepository.deleteProduct(id);
    return delProd;
  };

  updateProduct = async (id, product) =>{
    const upProd = await productRepository.updateProduct(id, product);
    return upProd;
  };

  createMocksProducts = async () => {
    let product = [];
    for (let i = 0; i < 100; i++) {
      product.push(generateProduct());
    }
    const products = await productRepository.addProduct(product);
    return products;
  };

};


/*export const getAllService = async (page, limit, key, value, sortField, sortOrder) => {
  try {
    const docs = await prodDao.getProducts (page, limit, key, value, sortField, sortOrder);
    return docs;
  } catch (error) {
    console.log(error);
  }
};

export const getByIdService = async (id) => {
  try {
    const doc = await prodDao.getProductById(id);
    if (!doc) throw new Error("Producto no encontrado");
    else return doc;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (product) => {
  try {
    const newProd = await prodDao.addProduct(product);
    if (!newProd) throw new Error("Error de validacion!");
    else return newProd;
  } catch (error) {
    console.log(error);
  }
};

export const updateService = async (id, update) => {
  try {
    const doc = await prodDao.getProductById(id);
    if (!doc) {
      throw new Error("Producto no encontrado");
    } else {
      const prodUpd = await prodDao.updateProduct(id, update);
      return prodUpd;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteService = async (id) => {
  try {
    const prodDel = await prodDao.deleteProduct(id);
    return prodDel;
  } catch (error) {
    console.log(error);
  }
};*/
