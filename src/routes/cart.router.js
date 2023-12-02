import { Router } from "express";
const router = Router();

/* import { productDaoFS } from "../daos/fileSystem/products.dao.js"; */
import * as controller from "../controllers/carts.controller.js";


//MOSTRAR TODOS LOS PRODUCTOS
router.get("/all", controller.getAllCarts);

//CREAR PRODUCTO.
router.post("/", controller.createCart);

//MOSTRAR PRODUCTO POR ID.
router.get("/:id", controller.getCartById);

//MODIFICAR PRODUCTO.
router.put("/:id", controller.updateCart);

//ELIMINAR PRODUCTO.
router.delete("/:id", controller.deleteCart);

export default router;