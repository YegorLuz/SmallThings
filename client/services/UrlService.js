import { apiUri, urlOptionalParam } from '../utils';

class UrlService {
    static companyInfo () {
        return `${apiUri()}/company-info`;
    }

    static products (id = null) {
        return `${apiUri()}/products${urlOptionalParam(id)}`;
    }
}

export default UrlService;