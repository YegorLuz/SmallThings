import React from 'react'

const AppContext = {
    colorPalette: {},
    companyInfo: {},
    productId: '',
    products: [],
    categoryId: '',
    categories: [],
    storeId: '',
    stores: [],
};

export default React.createContext(AppContext)