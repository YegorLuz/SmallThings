const mongoose = require('mongoose');
const Address = require('../data/address');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// create a schema
const orderSchema = new Schema({
    _id: ObjectId,
    products: [{ type: ObjectId, ref: 'Product' }],
    deliveryAddress: Address,
    deliveryDate: String,
    deliveryTime: String,
    pickup: Boolean, // Самовывоз
    isActive: Boolean,
}, { collection: 'Orders' });

// we need to create a model using it
const Order = mongoose.model('Order', orderSchema, 'Orders');

module.exports = Order;