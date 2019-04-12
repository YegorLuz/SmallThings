// import axios from 'axios';
import upcsdk from './api/UpcSDK';

const UpcSDK = new upcsdk.UpcSDKClient();

/*
const UpcSDK = {
    configure(options = {}) {
        const config = {
            baseURL: options.apiUrl,
            timeout: 30000,
            headers: {
                'UPC-Api-Key': options.apiKey,
                'UPC-Organization-Id': options.organizationId,
            },
            client: options.client,
            tokenSecret: options.tokenSecret,
            isSandbox: options.isSandbox,
        };
        return new UpcSDKClient(config);
    },
};

export const getUpcApiToken = (url, clientSecret) =>
    axios
        .post(url, {
            client_secret: clientSecret,
        })
        .then(function response({ data }) {
            return data;
        })
        .catch(function error(err) {
            throw err;
        });

export default Object.assign({}, UpcSDK, { UpcSDKClient, getUpcApiToken }, {});
*/

export default UpcSDK;