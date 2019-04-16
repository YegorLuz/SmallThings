import createModel from './base'
import { Name, Description, Price, ProductImage, SalesInformation, Ingredients, Nutrition } from './product'
import { Pagination } from './meta';
/**
 * @class Class for Media model.
 * @param {ProductImage} media - array of media.
 * @constructor
 */

const ProductModel = createModel({
    _id: { key: '_id', type: 'string', optional: true },
    title: { key: 'title', type: 'string', optional: true },
    description: { key: 'description', type: 'string', optional: true },
    price: { key: 'price', type: 'number', optional: true },
    image: { key: 'image', type: 'string', optional: true },
    color: { key: 'color', type: 'string', optional: true },
    category: { key: 'category', type: 'string', optional: true },
    store: { key: 'store', type: 'string', optional: true },
});

const Products = ({ data, meta }) => ({
    products: data.products.map(product => new ProductModel(product)),
    pagination: new Pagination(meta.pagination),
});

export { Products, ProductModel as Product };
