const CryptoJS = require('crypto-js');
const moment = require('moment');
const { base64url_encode, base64url_decode, shallowEquality, isAuthorized, forbid } = require('../utils');
const { TOKEN_LIFE_TIME, TOKEN_SECRET, TOKEN_HEADER } = require('../constants');

const urlsRequireAuth = [
    '/product'
];

function createToken (userData) {
    const data = {
        ...userData,
        expirationDate: moment() + TOKEN_LIFE_TIME,
    };

    let header_str = CryptoJS.enc.Utf8.parse(JSON.stringify(TOKEN_HEADER));
    let header_enc = base64url_encode(header_str);

    let data_str = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    let data_enc = base64url_encode(data_str);

    let token = header_enc + '.' + data_enc;

    token = CryptoJS.AES.encrypt(token, TOKEN_SECRET).toString();

    return token;
}

function parseToken (tk) {
    const token = CryptoJS.AES.decrypt(tk, TOKEN_SECRET).toString(CryptoJS.enc.Utf8);

    let [ header_enc, data_enc ] = token.split('.');

    let data_str = base64url_decode(data_enc);
    let t_data = JSON.parse(data_str.toString(CryptoJS.enc.Utf8));

    let header_str = base64url_decode(header_enc);
    let t_header = JSON.parse(header_str.toString(CryptoJS.enc.Utf8));

    return { data: t_data, header: t_header };
}

function isValidToken (token, getUser) {
    const { data, header } = parseToken(token);
    if (shallowEquality(header, TOKEN_HEADER)) {
        const { id, login, password, expirationDate } = data;
        const userData = getUser(id);
        if (userData.login === login && userData.password === password) {
            if (moment() < expirationDate) {
                return true;
            }
        }
    }

    return false;
}

function useAuth (DataBase) {
    return function (request, response, next) {
        const { method, originalUrl, data, headers } = request;
        const token = headers['UPC-AUTH-TOKEN'] || '';

        if (!isAuthorized(request)) {
            forbid(response);
        }

        if (method === 'POST' && originalUrl === '/api/auth') {
            const { login, password } = data;
            DataBase.getUserByCreds(login, password)
                .then(userData => {
                    const { _id, firstName, lastName, email } = userData;
                    if (_id) {
                        const token = createToken({id: _id, login, password});
                        response.send({_id, firstName, lastName, email, token});
                        next();
                    } else {
                        forbid(response);
                    }
                })
                .catch(error => {
                    console.log(error);
                    forbid(response);
                });
        }

        if (method === 'POST' && originalUrl === '/api/registration') {
            const { login, password, email, firstName = '', lastName = '' } = data;
            DataBase.addUser({ login, password, email, firstName, lastName })
                .then(userData => {
                    console.log(userData);
                    response.send(userData);
                    next();
                })
                .catch(error => {
                    console.log(error);
                });
        }

        if (token.length) {
            if (isValidToken(token)) {
                next();
            } else {
                response.status(402).end({ message: 'Auth Token has been expired...' });
            }
        }

        next();
    }
}

module.exports = { useAuth };
