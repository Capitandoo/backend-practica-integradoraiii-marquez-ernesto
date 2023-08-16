import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
import CartDao from "../persistence/daos/mongodb/managers/cart.manager.js";
import ProductDao from "../persistence/daos/mongodb/managers/product.manager.js";
import CartManager from "../persistence/daos/filesystem/managers/CartDao.js";
import ProductManager from "../persistence/daos/filesystem/managers/ProductDao.js";
import { pathCarritos } from "../path.js";
import { pathProducts } from "../path.js";
import CartRepository from "../persistence/daos/repository/cart.repository.js";

const { cartManager } = factory;
const cartRepository = new CartRepository();
const cartDao = new CartDao();
const prodDao = new ProductDao();
//const cartDao = new CartManager (pathCarritos);
//const prodDao = new ProductManager (pathProducts);

export default class CartService extends Services {
  constructor() {
    super(cartManager);
  }

  getCart = async (id) => await cartRepository.getCart(id);
  createCart = async () => await cartRepository.addCart();
  deleteCart = async (id) => await cartRepository.deleteAllProducts(id);
  updateCart = async (id, products) => await cartRepository.updateProducts(id, products);
  updateProductInCart = async (cid, pid, quantity) => await cartRepository.updateProductQuantity(cid, pid, quantity);
  addProductInCart = async (cid, pid) => await cartRepository.addProductToCart(cid, pid)
  deleteProductInCart = async (cid, pid) => await cartRepository.deleteProduct(cid, pid)
}

/*export const getCartService = async (cid) => {
  try {
    const cart = await cartDao.getCartById(cid);
    if (!cart) throw new Error("Carrito no encontrado");
    else return cart;
  } catch (error) {
    console.log(error);
  }
};
export const createCartService = async (product) => {
  try {
    const newCart = await cartDao.addCart(product);
    if (!newCart) throw new Error("No se pudo agregar al carrito");
    else return newCart;
  } catch (error) {
    console.log(error);
  }
};
export const addProductToCartService = async (cid, pid) => {
  try {
    const consultacarrito = await cartDao.getCartById(cid);
    if (!consultacarrito) throw new Error("El carrito no existe");
    const consultaproducto = await prodDao.getProductById(pid);
    if (!consultaproducto) throw new Error("Producto no encontrado");
    const prodAdded = await cartDao.addProductToCart(cid, pid);
    return prodAdded;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductToCartService = async (cid, pid) => {
  try {
    const prodDelete = await cartDao.deleteProductToCart(cid, pid);
    if (!prodDelete) throw new Error("El carrito no fue encontrado");
    return { message: `El producto con id: ${pid} fue borrado` };
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllProductToCartService = async (cid) => {
  try {
    const cartDelete = await cartDao.deleteAllProductsToCart(cid);
    if (!cartDelete) throw new Error("El carrito no fue encontrado");
    return { message: `El carrito con id: ${cid} fue borrado` };
  } catch (error) {
    console.log(error);
  }
};

export const updateProductToCartService = async (cid, product) => {
  try {
    let cart = await cartDao.getCartById(cid);
    if (!cart) {
      throw new Error("Cart not found!");
    } else {
      const newCart = await cartDao.updateProductToCart(cid, product);
      return newCart;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProductQuantityService = async (cid, pid, quantity) => {
  try {
    let cart = await cartDao.getCartById(cid);
    if (!cart) {
      throw new Error("Cart not found!");
    } else {
      const newCart = await cartDao.updateProductQuantity(cid, pid, quantity);
      return newCart;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addProToCartService = async (cid, pid) => {
  try {
    const exists = await cartDao.getCartsById(cid);
    const newProd = await cartDao.addProToCart(cid, pid);
    if (!exists) throw new Error("Pet not found!");
    else return newProd;
  } catch (error) {
    console.log(error);
  }
};
*/
