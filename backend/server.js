const app = require('./app');
const connectDatabase =  require('./config/database');


const dotenv = require('dotenv');

//NOTE setting up the config file 
dotenv.config({path : './backend/config/config.env'});

//NOTE conneccting to databse
connectDatabase();

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is running on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode. `)
});
