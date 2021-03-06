const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// create a schema
const categorySchema = new Schema({
    _id: ObjectId,
    title: String,
    description: String,
    icon: String,
    categoryId: { type: ObjectId, ref: 'Category' },
    img: String,
    order: Number,
    direction: String,
    span: Number,
    row: Number,
}, { collection: 'Categories' });

// we need to create a model using it
const Category = mongoose.model('Category', categorySchema, 'Categories');

module.exports = Category;