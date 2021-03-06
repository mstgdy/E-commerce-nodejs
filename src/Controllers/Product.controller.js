const ProductModel = require('../Models/Product.model')
const ProdctModel = require('../Models/Product.model')
const ApiError = require('../Helpers/ApiError');
const UserModel = require('../Models/User.model');
const _ = require('lodash')

module.exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products );
    }
    catch (err) {
        next(ApiError.internalRequest(err.message))
    }
}

module.exports.addProduct = async (req, res, next) => {
    const { name, price, quantity, description, categoryId, picture } = req.body;
    try {

        const newProduct = new ProdctModel({ name, price, quantity, description, categoryId, picture })
            .save()
        const data = await newProduct;
        res.status(200).json({ status: "success", data });
    }
    catch (err) {
        next(ApiError.internalRequest(err.message))
    }
}
module.exports.updateProduct = async (req, res, next) => {
    const { name, price, quantity, description, categoryId, picture, productId } = req.body;
    try {
        console.log("product,",productId );
        const product = await ProductModel.updateOne({ _id: productId }, { name, price, quantity, description, categoryId, picture });
        res.status(200).json({ status: "success", product });
    }
    catch (err) {
        next(ApiError.internalRequest(err.message))
    }

}
module.exports.deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const product = await ProductModel.deleteOne({ _id: productId });
        res.status(200).json({ status: "success", product });

    }
    catch (err) {
        next(ApiError.internalRequest(err.message))
    }
}
module.exports.getProductDetails = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const product = await ProdctModel.findOne({ _id: productId });
        if (!product) {
            next(ApiError.forbiddenRequest("product not found"))
            return;
        }
        res.status(200).json(   product );
    }
    catch (err) {
        next(ApiError.internalRequest(err.message))

    }
}
