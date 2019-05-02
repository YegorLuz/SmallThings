import axios from 'axios';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { createHttpError, noCacheHeaders, serializeData, parseSerializedData } from './utils';

import { Products, Product } from '../models/products';
import { Company } from '../models/company';

const TOKEN_NAME = 'token';
const localStorageKey = 'signOut';

const addInterceptor = function (provider) {
    const { axiosInstance, config = {} } = provider || {};
    const { tokenSecret, isSandbox } = config;
    axiosInstance.interceptors.response.use(
        function r(response) {
            return response;
        },
        function e(error) {
            const originalRequest = error.config;

            /* eslint-disable no-underscore-dangle */
            /*
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
                            })
                    }
                }
            }
            */

            return Promise.reject(error);
        },
    )
};

class UpcSDKClient {
    constructor(config) {
        this.config = config;
        this.axiosInstance = axios.create(config);
        addInterceptor(this);

        this.updateHeadersWithToken = this.updateHeadersWithToken.bind(this);
        this.updateHeadersWithApiToken = this.updateHeadersWithApiToken.bind(this);
        this.getApiToken = this.getApiToken.bind(this);
        this.createFetch = this.createFetch.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.getCompanyInfo = this.getCompanyInfo.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getPages = this.getPages.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.saveToken = this.saveToken.bind(this);
        this.killToken = this.killToken.bind(this);
        this.initHomePage = this.initHomePage.bind(this);
        this.initLoginPage = this.initLoginPage.bind(this);
        this.initCategoryPage = this.initCategoryPage.bind(this);
        this.ping = this.ping.bind(this);
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

            //const { access_token = '', refresh_token = '' } = UpcSDKClient.getToken();

            const requestSettings = Object.assign(
                { method: 'GET' },
                cacheable ? {} : { headers: noCacheHeaders },
                //access_token ? { headers: { 'UPC-AUTH-TOKEN': access_token, 'UPC-REFRESH-TOKEN': refresh_token } } : {},
                { cancelToken },
                rest,
                params,
            );

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

    updateHeadersWithToken (currentToken) {
        if (currentToken) {
            this.axiosInstance.defaults.headers['UPC-AUTH-TOKEN'] = currentToken;
        } else {
            delete this.axiosInstance.defaults.headers['UPC-AUTH-TOKEN'];
        }
    }

    updateHeadersWithApiToken (currentToken) {
        this.axiosInstance.defaults.headers['UPC-Api-Token'] = currentToken;
    }

    accessTokenRefresh (payload) {
        const endpoint = this.createFetch({
            url: '/customers/access-token',
            method: 'PUT',
            //Model: Auth,
        });
        return endpoint(payload);
    }

    getApiToken (clientId, payload) {
        const endpoint = this.createFetch({
            url: `/applications/${clientId}/auth`,
            method: 'POST',
        });

        return endpoint(payload)
    }

    saveToken ({ access_token, refresh_token }) {
        if (global.window && global.window.document) {
            const data = {
                'max-age': 15*60,
                secure: false, //http, true = https
                samesite: true,
                access_token,
                refresh_token,
            };
            global.window.document.cookie = cookie.serialize('token', serializeData(data));
        }
    }

    static getToken () {
        if (global.window && global.window.document) {
            const { token } = cookie.parse(global.window.document.cookie);
            const { access_token, refresh_token } = cookie.parse(token);
            return {access_token, refresh_token};
        }
        return {};
    }

    killToken () {
        if (global.window && global.window.document) {
            global.window.document.cookie = cookie.serialize('token', serializeData({}));
        }
    }

    getProducts (payload) {
        const endpoint = this.createFetch({
            url: '/products',
            method: 'GET',
            //Model: Products,
        });
        return endpoint(payload);
    };

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

    getPages (payload) {
        const endpoint = this.createFetch({
            url: `/menu`,
            method: 'GET',
            // Model: Categories,
        });
        return endpoint(payload);
    }

    loginUser (payload) {
        const endpoint = this.createFetch({
            url: `/auth`,
            method: 'POST',
            // Model: Categories,
        });
        return endpoint(payload);
    }

    registerUser (payload) {
        const endpoint = this.createFetch({
            url: `/registration`,
            method: 'POST',
            // Model: Categories,
        });
        return endpoint(payload);
    }

    ping (payload) {
        const endpoint = this.createFetch({
            url: `/ping`,
            method: 'POST',
            // Model: Categories,
        });
        return endpoint(payload);
    }

    initHomePage (payload) {
        const endpoint = this.createFetch({
            url: `/home-page`,
            method: 'GET',
            // Model: Categories,
        });
        return endpoint(payload);
    }

    initLoginPage (payload) {
        const endpoint = this.createFetch({
            url: `/login-page`,
            method: 'GET',
            // Model: Categories,
        });
        return endpoint(payload);
    }

    initCategoryPage (payload) {
        const endpoint = this.createFetch({
            url: `/category-page`,
            method: 'GET',
            // Model: Categories,
        });
        return endpoint(payload);
    }
}

export default UpcSDKClient;