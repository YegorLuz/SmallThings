const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// create a schema
const pageSchema = new Schema({
    _id: ObjectId,
    title: String,
    content: String,
    order: Number,
    showInFooter: Boolean,
    showInHeader: Boolean,
}, { collection: 'Pages' });

// we need to create a model using it
const Page = mongoose.model('Page', pageSchema, 'Pages');

module.exports = Page;