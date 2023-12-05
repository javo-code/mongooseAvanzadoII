import * as service from "../services/carts.service.js";

export const getAllCarts = async (req, res, next) => {
  try {
      const response = await service.getAll();
      res.status(200).json(response);
  } catch (error) {
      next(error.message);
  }
};

export const getCartById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.getById(id);
    if (!response) res.status(404).json({ msg: "Cart Not found!" });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const createCart = async (req, res, next) => {
  try {
    const response = await service.create(req.body);
    if (!response) res.status(404).json({ msg: "Error create cart!" });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.update(id, req.body);
    if (!response) res.status(404).json({ msg: "Error update cart! The ID does not exists..." });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.remove(id);
    if (!response) res.status(404).json({ msg: "Error delete cart! The ID does not exists..." });
    else res.status(200).json({ msg: `Cart id: ${id} deleted` });
  } catch (error) {
    next(error.message);
  }
};

export const addCartToUser = async (req, res, next) => {
  try {
    const { userId, cartId } = req.params;

    const response = await service.addCartToUser(userId, cartId);

    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const deleteFromCart = async (req, res, next) => {
  try {
    const { cartId, productId } = req.params;
    const response = await service.deleteFromCart(cartId, productId);
    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};
