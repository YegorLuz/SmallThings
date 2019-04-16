const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// create a schema
const userTypeSchema = new Schema({
    _id: ObjectId,
    title: String,
    accessLevel: Number,
}, { collection: 'UserTypes' });

// we need to create a model using it
const UserType = mongoose.model('UserType', userTypeSchema, 'UserTypes');

module.exports = UserType;