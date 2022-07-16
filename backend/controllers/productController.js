const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/APIFeatures');

//ANCHOR Create new Product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {d

    
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});

//ANCHOR  Get all Products => /api/v1/products?keyword=...
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    //NOTE pagination setup 
    const resPerPage = 4;
    const productCount = await Product.countDocuments();


    const apiFeature = new APIFeatures(Product,req.query)
    .search().filter().pagination(resPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products

    });
});

//ANCHOR Get single Product details => /api/v1/product/:id 
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => { 
    const product = await Product.findById(req.params.id);
    if(!product){
        next(new ErrorHandler("Product not Found",404));
    }else{
        res.status(200).json({
            success: true,
            message: "product found",
            product
        });
    }

    
});

//ANCHOR Update Product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
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
});

//ANCHOR Deleting  Product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req,res,next) => {
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

});