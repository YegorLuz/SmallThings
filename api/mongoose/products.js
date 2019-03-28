const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create a schema
const productSchema = new Schema({
    itemId: Number,
    item: String,
    completed: Boolean
}, { collection: 'Products' });

// we need to create a model using it
const Product = mongoose.model('Product', productSchema);

module.exports = Product;