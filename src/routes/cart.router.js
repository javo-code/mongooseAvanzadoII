import { Router } from "express";
const router = Router();

/* import { productDaoFS } from "../daos/fileSystem/products.dao.js"; */
import * as controller from "../controllers/carts.controller.js";


//MOSTRAR TODOS LOS CARRITOS
router.get("/all", controller.getAllCarts);

//CREAR CARRITO.
router.post("/", controller.createCart);

//MOSTRAR CARRITO POR ID.
router.get("/:id", controller.getCartById);

//MODIFICAR CARRITO.
router.put("/:id", controller.updateCart);

//ELIMINAR CARRITO.
router.delete("/:id", controller.deleteCart);

//AGRGAR CARRITO AL USUARIO.
router.post("/add/:userId/:cartId", controller.addCartToUser);

// ELIMINAR PORDUCTO DESDE EL CARRITO
router.get('/deleteFromCart', controller.deleteFromCart);

export default router;