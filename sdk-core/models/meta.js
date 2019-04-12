import createModel from './base';

/**
 * @class Class for Pagination model.
 * @param {number} page_size - page_size of pagination.
 * @param {number} page - page of pagination.
 * @param {number} next_page - next_page of pagination.
 * @param {number} prev_page - prev_page of pagination.
 * @param {number} total_pages - total_pages of pagination.
 * @param {number} total_count - total_count of pagination.
 * @constructor
 */
const Pagination = createModel({
    page: { key: 'page', oneOfType: ['number', 'object'] },
    nextPage: { key: 'nextPage', oneOfType: ['number', 'object'] },
    prevPage: { key: 'prevPage', oneOfType: ['number', 'object'] },
    totalPages: { key: 'totalPages', oneOfType: ['number', 'object'] },
});

/**
 * @class Class for Meta model.
 * @param {Pagination} pagination - pagination of meta.
 * @constructor
 */
const Meta = createModel({
    pagination: { key: 'pagination', type: 'object', model: Pagination, optional: true },
});

export { Meta, Pagination }
