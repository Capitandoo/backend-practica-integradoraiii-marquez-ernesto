import { Router } from "express";
import ProductController from '../controllers/product.controllers.js';
import { authorizationRole, passportCall } from "../middlewares/sessions.js";
import { uploader } from "../path.js";

const controller = new ProductController();
const router = Router();

router.get('/',passportCall("jwt"), authorizationRole(["user", "admin"]),controller.getAll);
router.get('/:id', passportCall("jwt"), authorizationRole(["user", "admin"]), controller.getById);
router.post("/mocking-products", controller.createMocksProducts);
router.post('/', passportCall("jwt"), authorizationRole(["premium", "admin"]), uploader.array("thumbnails"), controller.createProduct);
router.put('/:id', passportCall("jwt"), authorizationRole(["admin"]), controller.update);
router.delete('/:id', passportCall("jwt"), authorizationRole(["premium","admin"]), controller.deleteProduct);

export default router;
