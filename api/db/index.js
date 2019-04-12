const mongoose = require('mongoose');
const { DB_URL, DB_PORT, DB_NAME } = require('../config/dbConfig');
const User = require('../mongoose/user');
const Product = require('../mongoose/product');
const Color = require('../mongoose/color');
const Category = require('../mongoose/category');
const Page = require('../mongoose/page');
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


    /** ----- USERS ----- */
    static async getUser (_id) {
        return User.find({ _id });
    }

    static async getUserByCreds (login, password) {
        return User.find({ login, password });
    }

    static async addUser (data) {
        const user = new User(data);
        return user.save();
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



    /** CATEGORIES */
    static async getCategories () {
        return Category.find();
    }



    /** Menu */
    static async getPages () {
        return Page.find();
    }
}

module.exports = DataBase;
