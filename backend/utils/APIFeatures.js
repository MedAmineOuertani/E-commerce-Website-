const match = require("nodemon/lib/monitor/match");

class APIFeatures {
    constructor (query,queryStr){
        this.query=  query;  //ANCHOR Product;
        this.queryStr =queryStr; //ANCHOR req.query;
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex : this.queryStr.keyword,
                $options: 'i'
            }
        }:{}
        this.query = this.query.find(keyword);
        return this;
    }
    filter(){
        const queryCopy={...this.queryStr};
        //NOTE removing fields from the query 
        const removeFields = ['keyword','limit','page']; 
        removeFields.forEach(el=> delete queryCopy[el]);


        //NOTE Advance filter for price,ratings etc ...
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match => `$${match}`);

        console.log(queryStr);
        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(ResPerPAge){
        const currentPage = Number(this.queryStr.page);
        const skip = resPerPage * (currentPage-1);
        this.query= this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;