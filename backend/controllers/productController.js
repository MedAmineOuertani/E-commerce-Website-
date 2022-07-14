const Product = require('../models/product');

//ANCHOR Create new product => /api/v1/product/new
exports.newProduct= async (req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
};

exports.getProducts = async (req, res, next)=>{
    const products= await Product.find();
    res.status(200).json({
        success: true,
        count: products.length,
        products

    });
};
//ANCHOR get single product details => /api/v1/product/:id 
 
exports.getSingleProduct = async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }else{
        res.status(200).json({
            success: true ,
            product 
        });
    }
};