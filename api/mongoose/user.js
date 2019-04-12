const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// create a schema
const userSchema = new Schema({
    _id: ObjectId,
    login: String,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
}, { collection: 'Users' });

// we need to create a model using it
const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;