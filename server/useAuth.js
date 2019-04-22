const cookie = require('cookie');

const useAuth = async function (request, response, next) {
    const { access_token, refresh_token } = cookie.parse(request.cookies.token);
    process.env.UPC_AUTH_TOKEN = access_token;
    process.env.UPC_REFRESH_TOKEN = refresh_token;

    next();
};

module.exports = useAuth;