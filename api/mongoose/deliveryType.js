const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// create a schema
const deliveryTypeSchema = new Schema({
    _id: ObjectId,
    name: String,
    cost: Number,
}, { collection: 'DeliveryTypes' });

// we need to create a model using it
const DeliveryType = mongoose.model('DeliveryType', deliveryTypeSchema, 'DeliveryTypes');

module.exports = DeliveryType;