import { Schema, model } from "mongoose";

const CartCollectionName = 'carts'

export const cartSchema = new Schema({
  products: { type: Array },
});

export const CartModel = model(CartCollectionName, cartSchema);