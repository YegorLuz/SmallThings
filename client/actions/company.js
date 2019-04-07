import { COMPANY_INFO, SAVE, GET } from '../constants';

export function getCompanyInfo () {
    return {
        type: COMPANY_INFO + GET,
    };
}

export function saveCompanyInfo (data) {
    return {
        type: COMPANY_INFO + SAVE,
        payload: {
            data,
        },
    };
}
