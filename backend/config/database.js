const mongoose = require('mongoose');
const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URL, {
        useNewUrlParser: true
    }).then(con =>{
        console.log(`mongoDB Database connected with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase;