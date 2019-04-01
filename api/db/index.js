const mongoose = require('mongoose');
const { DB_URL, DB_PORT, DB_NAME } = require('../config/dbConfig');
const Product = require('../mongoose/product');
const Color = require('../mongoose/color');
let db = null;
let initialized = false;

class DataBase {
    static async init () {
        if (!initialized) {
            await mongoose.connect(`${DB_URL}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true });
            db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function () {
                console.log(`we're connected!`);
            });

            initialized = true;
        }
    }



    /** ----- PRODUCTS ----- */
    static async addProduct (data = {}) {
        const prod = new Product(data);
        return prod.save();
    }

    static async getProducts (params = {}) {
        return Product.find(params).populate('color').exec();
    }

    static async getProduct (_id) {
        return Product.find({ _id }).populate('color').exec();
    }

    static async removeProduct (id) {
        return Product.findByIdAndDelete(id);
    }



    /** ----- COLORS ----- */
    static async getColors (params = {}) {
        return Color.find(params);
    }

    static async addColor (data = {}) {
        const color = new Color(data);
        return color.save();
    }

    static async removeColor (id) {
        return Color.findByIdAndDelete(id);
    }
}

module.exports = DataBase;
