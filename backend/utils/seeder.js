const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/product.json');

//NOTE setting dotenv file
dotenv.config({path: './backend/config/config.env'});
connectDatabase();

const seedProducts = async ()=>{
    try{
        await Product.deleteMany();
        console.log('products are deleted');
        await Product.insertMany(products);
        console.log('all productts are added');
    }catch(error){
        console.log(error.message);
        process.exit();
    }
}
seedProducts();