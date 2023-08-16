import ProductManager from "./mongodb/managers/product.manager.js";
import UserManager from "./mongodb/managers/user.manager.js";
import CartManager from "./mongodb/managers/cart.manager.js";
import TicketManagerDB from "./mongodb/managers/ticket.manager.js";
import { initMongoDB } from "./mongodb/conexion.js";
import ProductManagerFs from "./filesystem/managers/ProductDao.js";

let userManager;
let productManager;
let cartManager;
let ticketManager;
let persistence = process.argv[2];
// let persistence = process.env.PERSISTENCE;

switch (persistence) {
  case "file":
    productManager = new ProductManagerFs(
      "./src/daos/filesystem/products.json"
    );
    //userManager = new UserManagerFS(...)
    break;
  case "mongo":
    await initMongoDB();
    userManager = new UserManager();
    productManager = new ProductManager();
    cartManager = new CartManager();
    ticketManager = new TicketManagerDB();
    break;
  default:
    productManager = new ProductManagerFs(
      "./src/daos/filesystem/products.json"
    );
    //userManager = new UserManagerFS(...)
    break;
}

export default { userManager, productManager, cartManager, ticketManager };
