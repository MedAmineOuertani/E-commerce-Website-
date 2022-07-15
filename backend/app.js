const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors');

app.use(express.json());



//NOTE Imoprt all routes 
const products = require('./routes/product');


app.use('/api/v1',products);

//NOTE Middleware to handle errors 
app.use(errorMiddleware);

module.exports = app;