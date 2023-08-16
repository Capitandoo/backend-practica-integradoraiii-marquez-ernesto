import MongoDao from "../mongo.dao.js";
import { CartsModel } from "../models/CartsModel.js";
import { ProductsModel } from "../models/ProductModel.js";
import { logger } from "../../../../utils/logger.js";

export default class CartManager extends MongoDao{

  constructor(){
    super (CartsModel)
  }

  async getCarts() {
    try {
      const response = await CartsModel.find({});
      return response;
    } catch (error) {
      logger.error(error);
      throw new Error (error.message);
    }
  }

  async addCart() {
    try {
      let result = await CartsModel.create({ products: [] });
      return result;
    } catch (error) {
      logger.error(error);
      throw new Error (error.message);
    }
  }

  async getCartById(cid) {
    try {
      const response = await this.model.findById(cid);
      return response.populate("products.product");
    } catch (error) {
      logger.error(error);
      throw new Error (error.message);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const findCart = await CartsModel.findById(cid);
      const proInCart = findCart.products.find (({product}) => product._id.toString() === pid);
      let result;
      if (proInCart) {
        result = await CartsModel.updateOne (
          { _id: cid, "products.product": pid },
          { $inc: { "products.$.quantity": 1 } }
        );
      } else {
        result = await CartsModel.updateOne(
          { _id: cid },
          { $push: { products: { product: pid, quantity: 1 } } }
        );
      }
      return {
        success: `El producto a sido agregado al carrito`, payload: result};
    } catch (error) {
      logger.error(error);
      throw new Error (error.message);
    }
  }

  async deleteProductToCart(cid, pid) {
    try {
      let result = await CartsModel.updateOne(
        { _id: cid },
        { $pull: { products: { product: { _id: pid } } } }
      );
      return { success: `El producto a sido borrado`, payload: result };
    } catch (error) {
      logger.error(error);
      throw new Error (error.message);
    }
  }

  async deleteAllProductsToCart(cid) {
    try {
      let result = await CartsModel.updateOne({ _id: cid }, { products: [] });
      return { success: `La lista de productos a sido borrada`, payload: result };
    } catch (error) {
      logger.error(error);
      throw new Error (error.message);
    }
  }

  async updateProductToCart(cid, product) {
    try {
      console.log(product)
      let result = await CartsModel.updateOne(
        { _id: cid },
        { $set: {"products.product": product} }
      );
      return { success: `El producto a sido actualizado`, payload: result };
    } catch (error) {
      logger.error(error);
      throw new Error (error.message);
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      let result = await CartsModel.updateOne(
        { _id: cid, "products.product": pid },
        { $set: { "products.$.quantity": quantity } }
      );
      return { success: `La cantidad del producto a sido actualizada`, payload: result };
    } catch (error) {
      logger.error(error);
      throw new Error (error.message);
    }
  }



}
