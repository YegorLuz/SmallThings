const mongoose = require('mongoose');
const Address = require('../data/address');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// create a schema
const userSchema = new Schema({
    _id: ObjectId,
    type: { type: ObjectId, ref: 'UserType' },
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    image: String,
    addresses: [Address],
    birthDate: String,
    phone: String,
    orders: [{ type: ObjectId, ref: 'Order' }],
}, { collection: 'Users' });

// we need to create a model using it
const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;