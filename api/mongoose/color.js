const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// create a schema
const colorSchema = new Schema({
    _id: ObjectId,
    value: String,
    name: String,
}, { collection: 'Colors' });

// we need to create a model using it
const Color = mongoose.model('Color', colorSchema, 'Colors');

module.exports = Color;