import { CartModel } from "./models/carts.model.js";


export default class CartsDaoMongoDB {
    async getAll() {
        try {
            const response = await CartModel.find({}).populate('products');
            return response;
        } catch (error) {
            console.error('Error al obtener todos los carritos:', error);
            throw new Error('Error al obtener todos los carritos');
        }
    }

    async getById(id) {
        try {
            const response = await CartModel.findById(id).populate('products');
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const response = await CartModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try {
            return await CartModel.findByIdAndUpdate({ _id: id }, obj, {
            new: true,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            return await CartModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }    
    
    async deleteFromCart(cartId, prodId) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
            } 
            const productIndex = cart.products.findIndex(product => product.toString() === prodId);
            if (productIndex === -1) {
            throw new Error('Product not found in the cart');
            } console.log(productIndex)
            cart.products.splice(productIndex, 1);
            const updatedCart = await cart.save();
            return updatedCart;
        } catch (error) {
            console.error(error);
        }
    }

}