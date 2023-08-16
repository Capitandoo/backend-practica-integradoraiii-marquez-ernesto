import factory from "../factory.js";

const { cartManager } = factory;

export default class CartRepository {
  constructor() {
    this.dao = cartManager;
  }

  async addCart() {
    return await this.dao.create();
  }

  async getCart(id) {
    return await this.dao.getCartById(id);
  }

  async addProductToCart(cid, pid) {
    return await this.dao.addProductToCart(cid, pid);
  }

  async deleteAllProducts(id) {
    return await this.dao.deleteAllProductsToCart(id);
  }

  async deleteProduct(cid, pid) {
    return await this.dao.deleteProduct(cid, pid);
  }

  async updateProducts(cid, products) {
    return await this.dao.updateProductToCart(cid, products);
  }

  async updateProductQuantity(cid, pid, quantity) {
    return await this.dao.updateProductQuantity(cid, pid, quantity);
  }
}
