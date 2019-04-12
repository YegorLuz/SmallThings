import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import { Products, Product } from '../models/products';
import { Company } from '../models/company';

import { noCacheHeaders, createHttpError } from './utils';
import { Auth } from '../models/auth';

const TOKEN_NAME = 'token';
const localStorageKey = 'signOut';

const addInterceptor = provider => {
    const { axiosInstance, config = {} } = provider || {};
    const { tokenSecret, isSandbox } = config;
    axiosInstance.interceptors.response.use(
        function r(response) {
            return response;
        },
        function e(error) {
            const originalRequest = error.config;

            /* eslint-disable no-underscore-dangle */
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                if (window) {
                    const value = window.document.cookie;
                    const { token = '' } = cookie.parse(value) || '';
                    if (token) {
                        const decoded = jwt.verify(token, tokenSecret);
                        const { accessToken, refreshToken, username } = decoded || {};

                        const data = {
                            provider: 'upc',
                            access_token: accessToken,
                            refresh_token: refreshToken,
                            username,
                        };
                        provider
                            .accessTokenRefresh({ data })
                            .then(res => {
                                const signedToken = jwt.sign(JSON.parse(JSON.stringify(res)), tokenSecret);
                                window.document.cookie = cookie.serialize(TOKEN_NAME, signedToken, {
                                    expires: new Date(res.accessTokenExpiresAt),
                                    path: '/',
                                    secure: !isSandbox,
                                });
                                provider.updateHeadersWithToken(res.accessToken);
                                return axios(originalRequest);
                            })
                            .catch(() => {
                                window.document.cookie = cookie.serialize(TOKEN_NAME, '', {
                                    maxAge: -1, // Expire the cookie immediately.
                                    path: '/',
                                });
                                window.localStorage.setItem(localStorageKey, Date.now().toString());
                                window.location.href = '/login';
                            });
                    }
                }
            }

            return Promise.reject(error);
        },
    );
};

class UpcSDKClient {
    constructor(config) {
        this.config = config;
        this.axiosInstance = axios.create(config);
        addInterceptor(this);

        this.getApiToken = this.getApiToken.bind(this);
        this.getDefaults = this.getDefaults.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.getCompanyInfo = this.getCompanyInfo.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getMenu = this.getMenu.bind(this);
    }

    createFetch({ url, cancelable = true, cacheable = false, Model, ...rest }) {
        let cancelRequest;
        const _that = this;

        return function (params = {}) {
            if (cancelRequest && cancelable) {
                cancelRequest();
            }
            const { token: cancelToken, cancel } = axios.CancelToken.source();
            cancelRequest = cancel;

            const requestSettings = Object.assign(
                { method: 'GET' },
                cacheable ? {} : { headers: noCacheHeaders },
                { cancelToken },
                rest,
                params,
            );

            console.log(_that.config);

            return _that.axiosInstance(url, requestSettings).then(
                response => (Model ? new Model(response.data) : response.data),
                error => {
                    const httpError = createHttpError(error);
                    if (!httpError.canceled) {
                        console.error(`Error on url: ${url}`);
                        console.error(httpError);
                    }
                    throw httpError;
                },
            );
        };
    }

    getConfig() {
        return this.config;
    }

    updateHeadersWithToken(currentToken) {
        if (currentToken) {
            this.axiosInstance.defaults.headers['UPC-Auth-Token'] = currentToken;
        } else {
            delete this.axiosInstance.defaults.headers['UPC-Auth-Token'];
        }
    }

    updateHeadersWithApiToken(currentToken) {
        this.axiosInstance.defaults.headers['UPC-Api-Token'] = currentToken;
    }

    getApiToken (clientId, payload) {
        console.log({ clientId, payload });
        const endpoint = this.createFetch({
            url: `/applications/${clientId}/auth`,
            method: 'POST',
        });

        return endpoint(payload);
    };

    /**
     * Returns API defaults
     * @method
     * @return {Object} defaults
     */
    getDefaults () {
        const endpoint = this.createFetch({
            url: `/`,
            cacheable: true,
        });
        return endpoint();
    };

    /**
     * Returns Products search
     * @method
     * @param {Object} payload - request payload
     * @return {Object} products
     */
    getProducts (payload) {
        const endpoint = this.createFetch({
            url: '/products',
            method: 'POST',
            Model: Products,
        });
        return endpoint(payload);
    };

    /**
     * Returns Product search
     * @method
     * @param {Object} payload - request payload
     * @return {Object} product
     */
    getProduct (payload) {
        const { id } = payload;
        const endpoint = this.createFetch({
            url: `/products/:${id}`,
            method: 'POST',
            Model: Product,
        });
        return endpoint(payload);
    };

    getCompanyInfo (payload) {
        const endpoint = this.createFetch({
            url: `/company-info`,
            method: 'GET',
            // Model: Company,
        });
        return endpoint(payload);
    };

    getCategories (payload) {
        const endpoint = this.createFetch({
            url: `/category-list`,
            method: 'GET',
            // Model: Categories,
        });
        return endpoint(payload);
    }

    getMenu (payload) {
        const endpoint = this.createFetch({
            url: `/menu`,
            method: 'GET',
            // Model: Categories,
        });
        return endpoint(payload);
    }
}

export { UpcSDKClient };
