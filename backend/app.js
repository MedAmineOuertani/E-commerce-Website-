const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors.js');

app.use(express.json());

//NOTE Middleware to handle errors 
app.use(errorMiddleware);

//NOTE Imoprt all routes 
const products = require('./routes/product');


app.use('/api/v1',products);



module.exports = app;