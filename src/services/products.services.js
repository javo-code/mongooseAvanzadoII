import ProductDaoMongoDB from "../dao/mongoDB/products.dao.js";
const prodDao = new ProductDaoMongoDB(); 
import fs from "fs";
import { __dirname } from "../utils.js";
import { ProductModel } from "../dao/mongoDB/models/products.model.js";
import { CartModel } from "../dao/mongoDB/models/carts.model.js";

const prodsFile = JSON.parse(
  fs.readFileSync(__dirname + "/data/products.json", "utf-8")
);

export const createFileProd = async () => {
  try {
    const newProd = await prodDao.create(prodsFile);
    if (!newProd) return false;
    return { message: "Products array saved sucesfully!" };
  } catch (error) {
    console.log(error);
  }
};

export const getAll = async () => {
  try {
    return await prodDao.getAll();
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id) => {
  try {
    const prod = await prodDao.getById(id);
    if (!prod) return false;
    else return prod;
  } catch (error) {
    console.log(error);
  }
};

export const create = async (obj) => {
  try {
    const newProd = await prodDao.create(obj);
    if (!newProd) return false;
    else return newProd;
  } catch (error) {
    console.log(error);
  }
};

export const update = async (id, obj) => {
  try {
    const prodUpd = await prodDao.update(id, obj);
    if (!prodUpd) return false;
    else return prodUpd;
  } catch (error) {
    console.log(error);
  }
};

export const remove = async (id) => {
  try {
    const prodDel = await prodDao.delete(id);
    if (!prodDel) return false;
    else return prodDel;
  } catch (error) {
    console.log(error);
  }
};
/* revisar */
export const getProductsByLimit = async (limit) => {
    try {
        const products = await prodDao.getProductsByLimit(limit);
        return products;
    } catch (error) {
        console.log(error);
        throw new Error('Error retrieving products by limit');
  }
};

export const addProdToCart = async (cartId, prodId) => {
  try {
    const prod = await ProductModel.findById(prodId);
    if (!prod) {
      throw new Error('Product not found');
    }
    const cart = await CartModel.findByIdAndUpdate(cartId, { $push: { products: prodId } });
    if (!cart) {
      throw new Error('cart not found');
    }
    return cart;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw new Error('Error adding product to cart');
  }
};

export const aggregation1 = async () => {
  try {
    return await prodDao.aggregation1()
  } catch (error) {
    console.log(error)
  }
};

export const aggregation2 = async () => {
  try {
    return await prodDao.aggregation2()
  } catch (error) {
    console.log(error)
  }
};