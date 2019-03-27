const mongoose = require('mongoose');
const DataModels = require('./schemes.js');
let db = null;
let initialized = false;
const models = {};

class DataBase {
    static async init () {
        if (!initialized) {
            const result = await mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
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
        if (!models['Product']) {
            const schema = new mongoose.Schema(DataModels.Product);
            models['Product'] = mongoose.model('Product', schema);
        }
        const product = new models.Product(data);
        return product.save();
    }

    static async getProduct (id) {
        return models.Product.find({ id });
    }
}

module.exports = DataBase;
