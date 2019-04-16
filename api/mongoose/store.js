const mongoose = require('mongoose');
const Address = require('../data/address');
const WorkingHours = require('../data/workingHours');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// create a schema
const storeSchema = new Schema({
    _id: ObjectId,
    company: { type: ObjectId, ref: 'Company' },
    workingHours: WorkingHours,
    minOrderAmount: Number,
    deliveryType: { type: ObjectId, ref: 'DeliveryType' },
    address: Address,
}, { collection: 'Stores' });

// we need to create a model using it
const Store = mongoose.model('Store', storeSchema, 'Stores');

module.exports = Store;