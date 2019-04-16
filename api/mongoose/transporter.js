const mongoose = require('mongoose');
const Car = require('../data/car');
const WorkingHours = require('../data/workingHours');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// create a schema
const transporterSchema = new Schema({
    _id: ObjectId,
    name: String,
    car: Car,
    phone: String,
    workingHours: WorkingHours,
}, { collection: 'Transporters' });

// we need to create a model using it
const Transporter = mongoose.model('Transporter', transporterSchema, 'Transporters');

module.exports = Transporter;