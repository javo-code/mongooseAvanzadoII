import * as service from "../services/products.services.js";

export const createFileCtr = async (req, res, next) => {
  try {
    const newProds = await service.createFileProd();
    if (!newProds) throw new Error("Validation Error!");
    else res.json(newProds);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const response = await service.getAll( page, limit );
    //res.status(200).json(response);
    const next = response.hasNextPage ? `http://localhost:8080/api/products/all?page=${response.nextPage}` : null;
    const prev = response.hasPrevPage ? `http://localhost:8080/api/products/all?page=${response.prevPage}` : null;
    res.json({
      payload: response.docs,
      info: {
        count: response.totalDocs,
        pages: response.totalPages,
        next,
        prev
      }
    }) 
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.getById(id);
    if (!response) res.status(404).json({ msg: "Product Not found!" });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const response = await service.create(req.body);
    if (!response) res.status(404).json({ msg: "Error create product!" });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.update(id, req.body);
    if (!response) res.status(404).json({ msg: "Error update product! The ID does not exists..." });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.remove(id);
    if (!response) res.status(404).json({ msg: "Error delete product! The ID does not exists..." });
    else res.status(200).json({ msg: `Product id: ${id} deleted` });
  } catch (error) {
    next(error.message);
  }
};

export const getProductsByLimit = async (req, res, next) => {
    try {
        const { limit } = req.query;
        const response = await service.getProductsByLimit(parseInt(limit));
        res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const addProdToCart = async (req, res, next) => {
  try {
    const { idCart, idProd } = req.params;
    const newProd = await service.addProdToCart(idCart, idProd);
    res.status(200).json(newProd);
  } catch (error) {
    next(error.message);
  }
}

export const aggregation1 = async (req, res, next) => {
  try {
    const response = await service.aggregation1();
    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const aggregation2 = async (req, res, next) => {
  try {
    const response = await service.aggregation2();
    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};
