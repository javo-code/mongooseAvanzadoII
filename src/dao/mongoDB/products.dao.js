import { ProductModel } from "./models/products.model.js";
import { CartModel } from "./models/carts.model.js";

export default class ProductDaoMongoDB {
    async getAll() {
        try {
        const response = await ProductModel.find({});
        return response;
        } catch (error) {
        console.log(error);
        }
    }

    async getById(id) {
        try {
            const response = await ProductModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try {
            return await ProductModel.findByIdAndUpdate({ _id: id }, obj, {
            new: true,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            return await ProductModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsByLimit(limit) {
        try {
            const response = await ProductModel.find({}).limit(limit);
            return response;
        } catch (error) {
            console.log(error);
            throw new Error('Error retrieving products by limit');
        }
    }
    
    async addProdToCart(cartId, prodId) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                throw new Error('Cart does not found');
            }
            cart.products.push(prodId);
            await cart.save();
            return cart;
        } catch (error) {
            console.log(error);
            throw new Error('Error adding product to cart');
        }
    }
}