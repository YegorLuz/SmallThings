const mongoose = require('mongoose');
const Product = require('../mongoose/products.js');
let db = null;
let initialized = false;

class DataBase {
    static async init () {
        if (!initialized) {
            const result = await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
            console.log(result);
            db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function () {
                console.log(`we're connected!`);
            });

            initialized = true;
        }
    }

    static get db () {
        return db;
    }

    static async createProduct (data = {}) {
        const prod = new Product(data);
        return prod.save();
    }

    static async getProduct (id) {
        return Product.find({ id });
    }
}

module.exports = DataBase;
