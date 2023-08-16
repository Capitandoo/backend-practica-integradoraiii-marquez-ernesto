import fs from 'fs';
import { pathCarritos } from '../../../../path.js';
import ProductManager from './ProductDao.js';

const consultaProducto = new ProductManager ();

export default class CartManager {
  constructor() {
    this.path = pathCarritos;
  }

  async getCarts () {
    try {
        if (!fs.existsSync (this.path)){
            fs.writeFileSync (this.path, '[]');
        }
        const carts = JSON.parse (await fs.promises.readFile (this.path, 'utf8'));
        return carts;
    } catch (error) {
        console.log (error);
    }
}
  
  async addCart (products) {
    try{
        const products = await this.getCarts ();
        const id = products.length > 0 ? products[products.length - 1].id : 0;
        const newProduct = { id: id + 1, products: [] };
        products.push(newProduct);
        await fs.promises.writeFile (this.path, JSON.stringify (products));
        return newProduct;
    } catch (error) {
        console.log (error);
    }
}
  
  async getCartById(cid) {
    try {
      const cartById = await this.getCarts();
      const data = cartById.find ((cart) => cart.id === cid);
      if (!data) {
        console.log(`El carrito con el id ${cid} no fue encontrado`);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart (cid, pid) {
    try {
      const cart = await this.getCartById (parseInt(cid));
      if (!cart) return "El carrito no existe";
      const productById = await consultaProducto.getProductById (parseInt(pid));
      if (!productById) return "Producto no encontrado";
      const cartsAll = await this.getCarts ();
      const cartFilter = cartsAll.filter (cart => cart.id != cid);
      const productBuscado = cart.products.some ((prod) => prod.product === parseInt(pid))
      if (productBuscado) {
        const productInCart = cart.products.find (prod => prod.product === parseInt(pid));
        productInCart.quantity++;
        const cartsConcat = [cart, ...cartFilter];
        await this.saveCarts (cartsConcat);
        return "Producto sumado al carrito";
      }
      cart.products.push ({product: productById.id, quantity: 1});
      const cartsConcat = [cart, ...cartFilter];
      await this.saveCarts (cartsConcat);
      return "Producto agregado al Carrito";
    } catch (error) {
      console.log(error);
    }
  };

  async saveCarts (cart) {
    await fs.promises.writeFile (this.path, JSON.stringify (cart));
  };

}
