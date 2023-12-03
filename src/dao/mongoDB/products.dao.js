import { ProductModel } from "./models/products.model.js";
import { CartModel } from "./models/carts.model.js";

export default class ProductDaoMongoDB {
    async getAll(page= 1, limit = 5) {
        try {
        const response = await ProductModel.paginate({}, { page, limit });
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
//CREAR ARCHIVO CON TODOS LOS PRODUCTOS
    async createProd(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
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
    
    async aggregation1() {
        try {
            const response = await ProductModel.aggregate([
            {
                $match: { category: "service"}
            },
            {
                $limit: 5 
            }
            ]);
            
            return response;
        } catch (error) {
            console.log(error);
            throw new Error('Error at aggregation1 - products.dao.js');
        }
    }

    async aggregation2() {
        try {
            return await ProductModel.aggregate([
                {
                    $group: {
                        _id: '$category',// Definimos a travez de que atributo nos va a grupar los documentos.
                        count: { $sum: 1 }
                    },/* 
                    $sort: {
                        price:
                    } */
                }
            ])
        } catch (error) {
            console.log(error);
            throw new Error('Error at aggregation2 - products.dao.js');
        }
    }

// ACTUALIZAR TODOS LOS ARCHIVOS
  /* async updateManyOnsale() {
    try {
      const products = await this.getAllProducts();
      for (const product of products) {
        product.age = getRandomNumber();
        product.save();
      }
      return { mesg: "Update products OK" };
    } catch (error) {
      console.log(error);
    }
  } */

}