const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const ColorSchema = {
    primary: { type: ObjectId, ref: 'Color' }, // header BG, buttons
    secondary: { type: ObjectId, ref: 'Color' }, // additional buttons
    footerBG: { type: ObjectId, ref: 'Color' },
    footerTextColor: { type: ObjectId, ref: 'Color' },
};

module.exports = ColorSchema;