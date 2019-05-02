import UpcSDK, { getUpcApiToken } from '../sdk-core/';
//const cookie = require('cookie');

const useAuth = async function (request, response, next) {
    //const { access_token = '', refresh_token = '' } = cookie.parse(request.cookies.token);
    //process.env.UPC_AUTH_TOKEN = access_token;
    //process.env.UPC_REFRESH_TOKEN = refresh_token;


    if (request.cookies.token) {
        UpcSDK.updateHeadersWithApiToken(request.cookies.token);
    } else {
        try {
            const url = `${process.env.UPC_API_URL}/applications/${process.env.UPC_API_KEY}/auth`;
            const { data } = await getUpcApiToken(url, process.env.UPC_CLIENT_SECRET);
            UpcSDK.updateHeadersWithApiToken(data.access_token);
            response.cookie('upcToken', data.access_token, { secure: process.env.NODE_ENV === 'production' });
            request.apiAccessToken = data.access_token;
        } catch (error) {
            console.log(error)
        }
    }

    next();
};

module.exports = useAuth;