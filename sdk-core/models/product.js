import createModel from './base';

/**
 * @class Class for Product Name/Description/Brand model.
 * @param {number} default - Products's default name/description/brand, non-internationalised.
 * @param {String} en - Product's default name/description/brand in English.
 * @constructor
 */
const NameSchema = {
    en: { key: 'en', type: 'string', optional: true },
};

const Name = createModel(NameSchema);
const Description = createModel(NameSchema);
const Brand = createModel(NameSchema);

/**
 * @class Class for Product Unit Price information model.
 * @param {string} id - Nested document id, created with storeid + + product_id.
 * @param {string} store_id - Store's unique id in Place Service .
 * @param {string} product_id - Product's unique id in Product Service .
 * @param {number} clicks_unit_price - Product's online price.
 * @param {string} bricks_unit_price - Product's bricks-and-mortar price.
 * @param {number} deposit_price - Product's deposit price.
 * @param {number} deposit_factor - How many deposits there are in the product.
 * @param {string} updated - Timestamp of when the price was last indexed into the ElasticSearch.
 * @constructor
 */
const Price = createModel({
    id: { key: 'id', type: 'string', optional: true },
    storeId: { key: 'store_id', oneOfType: ['string', 'number'], optional: true },
    productId: { key: 'product_id', type: 'string', optional: true },
    clicksUnitPrice: { key: 'clicks_unit_price', type: 'number', optional: true },
    bricksUnitPrice: { key: 'bricks_unit_price', type: 'number', optional: true },
    depositPrice: { key: 'deposit_price', type: 'number', optional: true },
    depositFactor: { key: 'deposit_factor', type: 'number', optional: true },
    updated: { key: 'updated', type: 'string', optional: true },
});

/**
 * @class Class for Product Media files
 * @param {string} media_mime_type - media_mime_type of media.
 * @param {string} media_type_code - media_type_code of media.
 * @param {string} media_storage_key - media_storage_key of media.
 * @constructor
 */
const ProductImage = createModel({
    mediaMimeType: { key: 'media_mime_type', type: 'string', optional: true },
    mediaTypeCode: { key: 'media_type_code', type: 'string', optional: true },
    mediaStorageKey: { key: 'media_storage_key', type: 'string', optional: true },
    mediaWidth: { key: 'media_width', type: 'number', optional: true },
    mediaHeight: { key: 'media_height', type: 'number', optional: true },
});

const SalesInformation = createModel({
    sellingUnitOfMeasure: { key: 'selling_unit_of_measure', type: 'string', optional: true },
    priceComparisonMeasurement: { key: 'price_comparison_measurement', type: 'object', optional: true },
});

const Ingredients = createModel({
    emphasise: { key: 'emphasise', type: 'boolean', optional: true },
    name: { key: 'name', type: 'object', optional: true },
    order: { key: 'order', type: 'number', optional: true },
});

const Nutrition = createModel({
    details: { key: 'details', type: 'array', optional: true },
    servingSize: { key: 'serving_size', type: 'object', optional: true },
});

export { Name, Description, Brand, Price, ProductImage, SalesInformation, Ingredients, Nutrition };
