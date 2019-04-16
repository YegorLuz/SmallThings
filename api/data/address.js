const Location = require('./location');

const Address = {
    name: String,
    postal: Number,
    city: String,
    street: String,
    house: String,
    flat: Number,
    location: Location,
};

module.exports = Address;