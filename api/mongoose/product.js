const mongoose = require('mongoose');
const Options = require('../data/options');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// create a schema
const productSchema = new Schema({
    _id: ObjectId,
    _storeProductId: String,
    title: String,
    description: String,
    price: Number,
    options: Options,
    category: { type: ObjectId, ref: 'Category' },
    store: { type: ObjectId, ref: 'Store' },
}, { collection: 'Products' });

// we need to create a model using it
const Product = mongoose.model('Product', productSchema, 'Products');

module.exports = Product;