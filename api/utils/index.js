const { UPC_API_KEY } = require('../constants');

const parseAuthHeaders = function (request) {
    const upcApiKey = request.headers['upc-api-key'] || '';

    return { upcApiKey };
};

const isAuthorized = function (request) {
    const { upcApiKey } = parseAuthHeaders(request);
    return upcApiKey === UPC_API_KEY;
};

const forbid = function (response) {
    response.status(403).end({ status: 403, message: 'Forbidden' });
};

function base64url_encode (src) {
    // Encode in classical base64
    let encodedSource = CryptoJS.enc.Base64.stringify(src);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
}

function base64url_decode (str) {
    let decodedSource = str.replace(/\_/g, '/');
    decodedSource = decodedSource.replace(/\-/g, '+');

    decodedSource += '=';

    decodedSource = CryptoJS.enc.Base64.parse(decodedSource);

    return decodedSource;
}

function shallowEquality (obj1, obj2) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
    for (let key in obj1) {
        if (!(obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] === obj2[key])) {
            return false;
        }
    }

    return true;
}

module.exports = { parseAuthHeaders, isAuthorized, forbid, base64url_encode, base64url_decode, shallowEquality };