const app = require('./app');
const connectDatabase = require('./config/database');


const dotenv = require('dotenv');

//NOTE handle the uncaught exceptions(this always should be on top in the code so it can handle the uncaught exceptions)
process.on('uncaughtException', err => {
    console.log(`ERROR : ${err.message}`);
    console.log("uncaught exception error ,Shutting down the server...");
    process.exit(1);

});

//NOTE setting up the config file 
dotenv.config({
    path: './backend/config/config.env'
});

//NOTE conneccting to databse
connectDatabase();

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode. `)
});

//ANCHOR handle unhandled promise rejections 
process.on('unhandledRejection', err => {
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to unhandled Promise rejection");
    server.close(() => {
        process.exit(1);
    });
})