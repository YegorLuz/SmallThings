const TOKEN_LIFE_TIME = 1000 * 15; // 15 sec
const TOKEN_SECRET = '1597534862';
const TOKEN_HEADER = {
    "alg": "HS256",
    "typ": "JWT"
};
const UPC_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1cGNfYXBpa2V5In0.3_jFK48gmheyO54a7VfiuFj0TtJccaOg33uC_8K4e7Q';

module.exports = { TOKEN_LIFE_TIME, TOKEN_SECRET, TOKEN_HEADER, UPC_API_KEY };