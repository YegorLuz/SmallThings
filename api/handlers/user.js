const { forbid, decryptData, createToken } = require('../utils');

const authHandler = function (DataBase) {
    return async function (request, response) {
        const { body, forbidden } = request;

        if (forbidden) return;

        const { token } = body || {};
        const { email, password } = decryptData(token);

        const userData = await DataBase.getUserByCreds(email, password);
        console.log('authHandler -> userData', userData);

        DataBase.getUserByCreds(email, password)
            .then(userData => {
                const { _id, firstName, lastName, image, email } = userData[0];
                if (_id) {
                    const access_token = createToken({ id: _id, email, password });
                    const refresh_token = createToken({ access_token, type: 'refresh' });
                    response.send({ userData: { _id, firstName, lastName, email, image, access_token, refresh_token } });
                } else {
                    forbid(request, response);
                }
            })
            .catch(error => {
                forbid(request, response);
            });
    };
};

const registrationHandler = function (DataBase) {
    return async function (request, response) {
        const { data, forbidden } = request;

        if (forbidden) return;

        const { password, email, firstName = '', lastName = '' } = data;
        console.log(data);
        return;
        DataBase.addUser({ password, email, firstName, lastName })
            .then(userData => {
                response.send(userData);
            })
            .catch(error => {
                console.log(error);
            });
    };
};

module.exports = { authHandler, registrationHandler };