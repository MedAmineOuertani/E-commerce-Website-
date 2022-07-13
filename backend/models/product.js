const mongoose = require('mongoose');

const productSchmea = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter product name'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'please enter product price'],
        maxlength: [5, 'Product price cannot exceed 5 characters'],
        default: 0.0

    },
    description: {
        type: String,
        required: [true, 'Please Enter product description']

    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, 'Please Select Category For this product'],
        enum: {
            values: [
                'Electronics', 'Cameras', 'Laptops', 'Accessories', 'Food', 'Clothes', 'Shoes', 'Beauty/health', 'Sports'
            ],
            message: 'Please Select Correct Category For product'
        }


    },
    seller: {
        type: String,
        required: [true, 'Please Enter Product Seller']
    },
    stock: {
        type: Number,
        required: [true,'Please enter product Stock'],
        maxlength: [5,'Product cannot exceed 5 characters'],
        default:0

    },
    numberOfReviews: {
        type: Number,
        default:0
    },
    reviews: [
        {
            name: {
                type:String,
                required: true
            },
            rating: {
                type :Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('product', productSchmea);