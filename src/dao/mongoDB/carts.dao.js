import { CartModel } from "./models/carts.model.js";
import { UserModel } from "./models/user.model.js";


export default class CartsDaoMongoDB {
    async getAll() {
        try {
            const response = await CartModel.find({}).populate("products");
            return response;
        } catch (error) {
            console.error('Error al obtener todos los carritos:', error);
            throw new Error('Error al obtener todos los carritos');
        }
    }

    async getById(id) {
        try {
            const response = await CartModel.findById(id);
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

/*     AGREGAR CARRITOS AL USUARIO - VER VALIDACIONES */
async addCartToUser(userId, cartId) {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error('User does not found');
            }
            user.carts.push(cartId);
            await user.save();
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error adding cart to user');
        }
        } 
}

