const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// create a schema
const sizeSchema = new Schema({
    _id: ObjectId,
    value: String,
    name: String,
}, { collection: 'Sizes' });

// we need to create a model using it
const Size = mongoose.model('Size', sizeSchema, 'Sizes');

module.exports = Size;