import { Router } from "express";
import CartController from "../controllers/carts.controllers.js";
import { passportCall, authorizationRole } from "../middlewares/sessions.js";

const router = Router();
const controller = new CartController();

router.get('/:cid', passportCall("jwt"), controller.getCart);
router.post('/', passportCall("jwt"), controller.createCart);
router.post('/:cid/products/:pid', passportCall("jwt"), authorizationRole(["user"]), controller.addProductToCart);
router.delete('/:cid/products/:pid', passportCall("jwt"), authorizationRole(["user"]), controller.deleteProductToCart);
router.delete('/:cid', passportCall("jwt"), authorizationRole(["user"]), controller.deleteAllProductToCart);
router.put('/:cid', passportCall("jwt"), controller.updateProductToCart);
router.put('/:cid/products/:pid', passportCall("jwt"), controller.updateProductQuantity);
router.post("/:cid/purchase", passportCall("jwt"), controller.closeCart);

export default router;
