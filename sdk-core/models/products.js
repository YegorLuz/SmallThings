import createModel from './base'
import { Name, Description, Price, ProductImage, SalesInformation, Ingredients, Nutrition } from './product'
import { Pagination } from './meta';
/**
 * @class Class for Media model.
 * @param {ProductImage} media - array of media.
 * @constructor
 */

const ProductModel = createModel({
    gtin: { key: 'gtin', type: 'string' },
    extId: { key: 'ext_id', type: 'string' },
    id: { key: 'id', type: 'string' },
    name: { key: 'name', type: 'object', model: Name, optional: true },
    masterProductId: { key: 'master_product_id', type: 'string', optional: false },
    marketingMessage: { key: 'marketing_message', type: 'object', optional: true },
    description: { key: 'description', type: 'object', model: Description, optional: true },
    countryOfOrigin: { key: 'country_of_origin', type: 'object', optional: true },
    brand: { key: 'brand', type: 'object', optional: true },
    ingredients: { key: 'ingredients', type: 'array', model: Ingredients, optional: true },
    additionalIngredientStatement: { key: 'additional_ingredient_statement', type: 'object', optional: true },
    prices: { key: 'prices', type: 'object', model: Price, optional: true },
    media: { key: 'media', type: 'object', model: ProductImage, optional: true },
    updated: { key: 'updated', type: 'string', optional: true },
    salesInformation: { key: 'sales_information', type: 'object', model: SalesInformation, optional: true },
    categories: { key: 'categories', type: 'object', optional: true },
    measurements: { key: 'measurements', type: 'object', optional: true },
    manufacturer: { key: 'manufacturer', type: 'array', optional: true },
    packaging: { key: 'packaging', type: 'array', optional: true },
    nutrition: { key: 'nutrition', type: 'array', model: Nutrition, optional: true },
    consumerInstructions: { key: 'consumer_instructions', type: 'object', optional: true },
    alcoholPercentageByVolume: { key: 'alcohol_percentage_by_volume', type: 'number', optional: true },
    minimumAgeRequirement: { key: 'minimum_age_requirement', type: 'array', optional: true },
    dietaryInfo: { key: 'dietary_information', type: 'object', optional: true },
    safetyDataSheet: { key: 'safety_data_sheet', type: 'array', optional: true },
});

const Products = ({ data, meta }) => ({
    products: data.products.map(product => new ProductModel(product)),
    pagination: new Pagination(meta.pagination),
});

export { Products, ProductModel as Product };
