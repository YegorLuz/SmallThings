const mongoose = require('mongoose');
const ColorSchema = require('../data/colorSchema');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// create a schema
const companySchema = new Schema({
    _id: ObjectId,
    name: String,
    slogan: String,
    description: String,
    logo: String,
    colorScheme: ColorSchema,
    banner: String,
}, { collection: 'Companies' });

// we need to create a model using it
const Company = mongoose.model('Company', companySchema, 'Companies');

module.exports = Company;