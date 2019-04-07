import { API_HOST, API_PORT, API_URL } from '../constants';

export function apiUri () {
    return `${API_HOST}:${API_PORT}${API_URL}`;
}

export function urlOptionalParam (param = null) {
    return param !== null ? `/${param}` : '';
}
