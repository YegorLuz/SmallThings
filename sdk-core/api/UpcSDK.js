import axios from 'axios';
import cookie from 'cookie';
import { createHttpError, noCacheHeaders } from './utils';

import { Products, Product } from '../models/products';
import { Company } from '../models/company';

class UpcSDKClient {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:3300/api',
            timeout: 30000,
            headers: {
                'UPC-Api-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1cGNfYXBpa2V5In0.3_jFK48gmheyO54a7VfiuFj0TtJccaOg33uC_8K4e7Q',
            },
            client: 'upc',
        });

        this.createFetch = this.createFetch.bind(this);
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

    static saveToken (access_token, refresh_token) {
        if (global.window && global.window.document) {
            const data = {
                'max-age': 15,
                secure: false, //http, true = https
                samesite: true,
                access_token,
                refresh_token,
            };
            global.window.document.cookie = cookie.serialize('token', data);
        }
    }

    static getToken () {
        if (global.window && global.window.document) {
            const {token} = cookie.parse(global.window.document.cookie);
            const {access_token = '', refresh_token = ''} = token || {};
            return {access_token, refresh_token};
        }
        return {};
    }

    getProducts (payload) {
        const endpoint = this.createFetch({
            url: '/products',
            method: 'POST',
            Model: Products,
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

    getMenu (payload) {
        const endpoint = this.createFetch({
            url: `/menu`,
            method: 'GET',
            // Model: Categories,
        });
        return endpoint(payload);
    }
}

export default { UpcSDKClient };