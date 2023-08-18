import Controllers from "./class.controllers.js";
import CartService from "../services/carts.services.js";
import ProductService from "../services/product.services.js";
import TicketServices from "../services/ticket.services.js";
import { createResponse } from "../utils/utils.js";
import { sendGmail } from "./email.controllers.js";
import { logger } from "../utils/logger.js";


const cartService = new CartService();
const productService = new ProductService();
const ticketService = new TicketServices();

export default class CartController extends Controllers {
  constructor(){
      super(cartService)
  }

  getCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const cart = await cartService.getCart (cid);
      res.json(cart);
    } catch (error) {
      logger.error(error);
      next(error.message);
    }
  };
  
  createCart = async (req, res, next) => {
    try {
      const newCart = await cartService.createCart ();
      res.json(newCart);
    } catch (error) {
      logger.error(error);
      next(error.message);
    }
  };
  
  addProductToCart = async (req, res, next) => {
    try {
      const { userId, role } = req.user;
      const cid = req.params.cid;
      const pid = req.params.pid;
      if (role === "premium") {
        const ownerProduct = await productService.getProduct (pid);
        if (ownerProduct.owner.toString() !== userId) {
          return res.status(401).send({error:'No tenes permisos para realizar esta operación'})
        }
      }
      await cartService.getCart (cid);
      const prodAdded = await cartService.addProductInCart (cid, pid);
      res.json(prodAdded);
    } catch (error) {
      logger.error(error);
      next(error.message);
    }
  };
  
  deleteProductToCart = async (req, res, next) => {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const prodDelete = await cartService.deleteProductInCart (cid, pid);
      res.json(prodDelete);
    } catch (error) {
      logger.error(error);
      next(error.message);
    }
  };
  
  deleteAllProductToCart = async (req, res, next) => {
    try {
      const cid = req.params.cid;
      const cartDelete = await cartService.deleteCart (cid);
      res.json (cartDelete);
    } catch (error) {
      logger.error(error);
      next(error.message);
    }
  ;}
  
  updateProductToCart = async (req, res, next) => {
    try {
      const cid = req.params.cid;
      const data = {...req.body};
      const update = await cartService.updateCart (cid, data);
      res.json (update);
    } catch (error) {
      logger.error (error);
      next(error.message);
    }
  }
  
  updateProductQuantity = async (req, res, next) =>{
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const newQty = await cartService.updateProductInCart (cid, pid, quantity);
        res.json(newQty);
    } catch (error) {
      logger.error(error);
      next(error.message);
    }
  }
  
  closeCart = async (req, res) => {
    const { cid } = req.params;
    let cart = await cartService.getCart(cid);
  
    if (cart.products.length > 0) {
      let amount = 0;
      let productWithoutStock = [];
      let purchaser = req.user.email;
  
      cart.products.forEach(async ({product, quantity}) => {
        if (product.stock >= quantity) {
          amount += product.price * quantity;
          product.stock -= quantity;
          await productService.updateProduct(product._id, product);          
        } else {
          //productWithoutStock.push({product, quantity});
        }
      });
      
      if (amount > 0) {
        const ticketData = {
          purchase_datetime: new Date(),
          amount: amount,
          purchaser: purchaser,
        };
        const newTicket = await ticketService.createTicket(ticketData);
        if (newTicket) {
          const userName = req.user.first_name;
          const nameEmail = {name: userName};
          await sendGmail (nameEmail, ticketData);
          createResponse(res, 200, newTicket)
        } else {
          return res.status(400).send({ newTicket });
        }
      } else {
        return res.send({ response: "Sin productos" });
      }
    } else {
      return res.send({ response: "Sin productos en el carrito" });
    }
  };
}

