const colorPalette = require('../data/colorPalette');
let companyInfo = {
    name: 'Ukrainian Product Cluster',
    slogan: 'Шукаю &bull; знаходжу &bull; доставляю',
    logo: '../../assets/logos/small-things.png',
};

function withLoggedIn (data, request) {
    const loggedIn = (request.body || {}).loggedIn ? { loggedIn: true } : {};
    return { ...data, ...loggedIn };

}

const homePageHandler = function (DataBase) {
    return async function (request, response) {
        const { customerId = null, loggedIn } = request.body || {};
        let colors = colorPalette.index;
        let pages = [];
        let categories = [];

        try {
            if (customerId !== null) {
                colors = colorPalette[customerId];
            }

            pages = await DataBase.getPages();
            categories = await DataBase.getCategories();

            response.send(withLoggedIn({ pages, categories, colorPalette: colors, companyInfo, loggedIn }, request));
        } catch (error) {
            response.status(404).end(error);
        }
    };
};

const loginPageHandler = function (DataBase) {
    return async function (request, response) {
        const { customerId = null } = request.body || {};
        let colors = colorPalette.index;

        try {
            if (customerId !== null) {
                colors = colorPalette[customerId];
            }

            response.send(withLoggedIn({ colorPalette: colors, companyInfo }, request));
        } catch (error) {
            response.status(404).end(error);
        }
    };
};

const registrationPageHandler = function (DataBase) {
    return async function (request, response) {
        const { customerId = null } = request.body || {};
        let colors = colorPalette.index;

        try {
            if (customerId !== null) {
                colors = colorPalette[customerId];
            }

            response.send(withLoggedIn({ colorPalette: colors, companyInfo }, request));
        } catch (error) {
            response.status(404).end(error);
        }
    };
};

module.exports = { homePageHandler, loginPageHandler, registrationPageHandler };