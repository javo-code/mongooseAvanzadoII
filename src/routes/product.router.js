import { Router } from "express";
const router = Router();

import { productValidator } from "../middleware/productValidator.js";
/* import { productDaoFS } from "../daos/fileSystem/products.dao.js"; */
import * as controller from "../controllers/products.controller.js";


//MOSTRAR TODOS LOS PRODUCTOS
router.get("/", controller.getAllProducts);

//CREAR PRODUCTO.
router.post("/", productValidator, controller.createProduct);

//CREAR ARCHIVO CON PRODUCTOS
router.post('/file', controller.createFileCtr);

//AGRGAR PRODUCTO AL CARRITO.
router.post("/add/:idUser/:idProd", controller.addProdToCart)

//MOSTRAR PRODUCTO POR ID.
router.get("/:id", controller.getProductById);

//MODIFICAR PRODUCTO.
router.put("/:id", controller.updateProduct);

//ELIMINAR PRODUCTO.
router.delete("/:id", controller.deleteProduct);

export default router;