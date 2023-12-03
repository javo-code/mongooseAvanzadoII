import { Schema, model } from "mongoose";

const CartCollectionName = 'carts'

export const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    default:[]
  },

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