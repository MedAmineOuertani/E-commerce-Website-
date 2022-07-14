const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');

//ANCHOR Create new Product => /api/v1/admin/product/new
exports.newProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
};
//ANCHOR  Get all Products 
exports.getProducts = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        count: products.length,
        products

    });
};

//ANCHOR Get single Product details => /api/v1/product/:id 
exports.getSingleProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product Not Found',404));
    } else {
        res.status(200).json({
            success: true,
            product
        });
    }
};

//ANCHOR Update P roduct => /api/v1/admin/product/:id
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    } else {
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: true
        });
        res.status(200).json({
            success: true,
            product
        });
    }
}
//ANCHOR Deleting  Product => /api/v1/admin/product/:id
exports.deleteProduct = async (req,res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }else{
        await product.remove();
        res.status(200).json({
            success: true,
            message: 'Product successfully deleted'
        })
    }

};