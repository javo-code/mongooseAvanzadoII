import { Schema, model } from "mongoose";

const CartCollectionName = 'carts'

export const cartSchema = new Schema({

  products:[
    {
      type: Schema.Types.ObjectId,
      ref: 'products',
      default: []
    }
  ]
});

cartSchema.pre('find', function () {
  this.populate('products')
});

export const CartModel = model(CartCollectionName, cartSchema);