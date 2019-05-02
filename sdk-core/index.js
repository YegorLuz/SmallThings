import axios from 'axios';
import UpcSDKClient from './api/UpcSDK';

const UpcSDK = {
    configure(options = {}) {
        /*
        const upcAuthToken = process.env.UPC_AUTH_TOKEN ? { 'UPC-AUTH-TOKEN': process.env.UPC_AUTH_TOKEN } : {};
        const upcRefreshToken = process.env.UPC_AUTH_TOKEN ? { 'UPC-REFRESH-TOKEN': process.env.UPC_REFRESH_TOKEN } : {};

        const config = {
            baseURL: options.apiUrl,
            timeout: 30000,
            headers: options.apiKey ? {
                'UPC-Api-Key': options.apiKey,
                ...upcAuthToken,
                ...upcRefreshToken,
            } : {
                'UPC-Simple-Access-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1cGM3NWczNTJhIiwibmFtZSI6IlNtYXJ0IEtleSIsImlhdCI6MTUxNjIzOTAyMn0.iMJM6oicExkCG8N-OM7z6bsjNAbK24WwjygR_FTaC4c',
            },
            client: options.client,
            isSandbox: options.isSandbox,
        };
        */
        const config = {
            baseURL: options.apiUrl,
            timeout: 30000,
            headers: {
                'UPC-Api-Key': options.apiKey,
            },
            client: options.client,
            tokenSecret: options.tokenSecret,
            isSandbox: options.isSandbox,
        };
        return new UpcSDKClient(config);
    },
};

const goodiesdk = UpcSDK.configure({
    //apiUrl: 'http://localhost:3300/api',
    //apiKey: process.env.UPC_API_KEY,
    //client: 'upc',
    //isSandbox: process.env.NODE_ENV !== 'production',

    apiUrl: process.env.UPC_API_URL,
    apiKey: process.env.UPC_API_KEY,
    client: 'upc',
    tokenSecret: `${process.env.UPC_API_KEY}-${process.env.UPC_API_SECRET}`,
    isSandbox: process.env.NODE_ENV !== 'production',
});

export const getUpcApiToken = (url, clientSecret) =>
    axios
        .post(url, {
            client_secret: clientSecret,
        })
        .then(function response({ data }) {
            return data
        })
        .catch(function error(err) {
            throw err
        });

export default goodiesdk;