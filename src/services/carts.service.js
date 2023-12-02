import CartDaoMongoDB from "../dao/mongoDB/carts.dao.js";
import { CartModel } from "../dao/mongoDB/models/carts.model.js";
import { UserModel } from "../dao/mongoDB/models/user.model.js";
const cartDao = new CartDaoMongoDB(); 

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
  }
};

export const getAll = async () => {
  try {
    return await cartDao.getAll();
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id) => {
  try {
    const cart = await cartDao.getById(id);
    if (!cart) return false;
    else return cart;
  } catch (error) {
    console.log(error);
  }
};

export const create = async (obj) => {
  try {
    const newCart = await cartDao.create(obj);
    if (!newCart) return false;
    else return newCart;
  } catch (error) {
    console.log(error);
  }
};

export const update = async (id, obj) => {
  try {
    const cartUpd = await cartDao.update(id, obj);
    if (!cartUpd) return false;
    else return cartUpd;
  } catch (error) {
    console.log(error);
  }
};

export const remove = async (id) => {
  try {
    const cartDel = await cartDao.delete(id);
    if (!cartDel) return false;
    else return cartDel;
  } catch (error) {
    console.log(error);
  }
};

export const addCartToUser = async (userId, cartId) => {
  try {
    const cart = await CartModel.findById(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }
    const user = await UserModel.findByIdAndUpdate(userId, { $push: { carts: cartId } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error adding cart to user:', error);
    throw new Error('Error adding cart to user');
  }
};