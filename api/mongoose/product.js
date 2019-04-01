const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// create a schema
const productSchema = new Schema({
    _id: ObjectId,
    title: String,
    description: String,
    color: { type: ObjectId, ref: 'Color' },
    price: Number,
}, { collection: 'Products' });

// we need to create a model using it
const Product = mongoose.model('Product', productSchema, 'Products');

module.exports = Product;