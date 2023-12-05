import CartDaoMongoDB from "../dao/mongoDB/carts.dao.js";
const cartDao = new CartDaoMongoDB(); 
import { CartModel } from "../dao/mongoDB/models/carts.model.js";

import fs from "fs";
import { __dirname } from "../utils.js";

/* import ProductDaoFS from "../dao/fileSystem/products.dao.js";
import { __dirname } from "../utils.js";
const prodDao = new ProductDaoFS(
  __dirname + '/data/products.json'
) */

const cartsFile = JSON.parse(
  fs.readFileSync(__dirname + "/data/carts.json", "utf-8")
);

export const createFileCart = async () => {
  try {
    const newCart = await cartDao.createVart(cartsFile);
    if (!newCart) return false;
    return { message: "Carts array saved sucesfully!" };
  } catch (error) {
    console.log(error);
    throw new Error('Error at createFileCart - service');
  }
};

export const getAll = async () => {
  try {
    return await cartDao.getAll();
  } catch (error) {
    console.log(error);
    throw new Error('Error at getAll - service');
  }
};

export const getById = async (id) => {
  try {
    const cart = await cartDao.getById(id);
    if (!cart) return false;
    else return cart;
  } catch (error) {
    console.log(error);
    throw new Error('Error at getById - service');
  }
};

export const create = async (obj) => {
  try {
    const newCart = await cartDao.create(obj);
    if (!newCart) return false;
    else return newCart;
  } catch (error) {
    console.log(error);
    throw new Error('Error at create - service');
  }
};

export const update = async (id, obj) => {
  try {
    const cartUpd = await cartDao.update(id, obj);
    if (!cartUpd) return false;
    else return cartUpd;
  } catch (error) {
    console.log(error);
    throw new Error('Error at update - service');
  }
};

export const  remove = async (id) => {
  try {
    const cartDel = await cartDao.delete(id);
    if (!cartDel) return false;
    else return cartDel;
  } catch (error) {
    console.log(error);
    throw new Error('Error at remove - service');
  }
};

export const deleteFromCart = async (cartId, prodId) => {
  try {
    const cart = await CartModel.findById(cartId);
            if (!cart) {
            throw new Error('Cart not found');
            
          } console.log(cart);
            const productIndex = cart.products.findIndex(product => product.toString() === prodId);
            if (productIndex === -1) {
            throw new Error('Product not found in the cart');
            }console.log(productIndex)

            cart.products.splice(productIndex, 1);
            const updatedCart = await cart.save();
            return updatedCart;
  } catch (error) {
    console.log(error);
    throw new Error('Error at deleteFromCart - service');
  }
};

