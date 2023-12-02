import { Schema, model } from "mongoose";

const CartCollectionName = 'carts'

export const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    defaul:[]
  },

  products:[
    {
      type: Schema.Types.ObjectId,
      ref: 'products',
      default: []
    }
  ]
});
export const CartModel = model(CartCollectionName, cartSchema);