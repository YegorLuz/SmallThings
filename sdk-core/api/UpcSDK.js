import axios from 'axios';
import cookie from 'cookie';
import { createHttpError, noCacheHeaders, serializeData, parseSerializedData } from './utils';

import { Products, Product } from '../models/products';
import { Company } from '../models/company';

class UpcSDKClient {
    constructor(config) {
        this.config = config;
        this.axiosInstance = axios.create(config);

        this.createFetch = this.createFetch.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.getCompanyInfo = this.getCompanyInfo.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getPages = this.getPages.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.saveToken = this.saveToken.bind(this);
        this.initHomePage = this.initHomePage.bind(this);
        this.initLoginPage = this.initLoginPage.bind(this);
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

            const { access_token = '', refresh_token = '' } = UpcSDKClient.getToken();

            const requestSettings = Object.assign(
                { method: 'GET' },
                cacheable ? {} : { headers: noCacheHeaders },
                access_token ? { headers: { 'UPC-AUTH-TOKEN': access_token, 'UPC-REFRESH-TOKEN': refresh_token } } : {},
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
            const { access_token, refresh_token } = cookie.parse(global.window.document.cookie);
            return {access_token, refresh_token};
        }
        return {};
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
}

export default UpcSDKClient;