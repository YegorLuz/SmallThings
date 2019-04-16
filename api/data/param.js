const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const Param = {
    value: {
        type: ObjectId,
        oneOf: [
            { ref: 'Color' },
            { ref: 'Size' },
        ],
    },
    priceModifier: Number,
};

module.exports = Param;