const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
} = require('graphql/type');

const ProductMongo = require('../../mongoose/products');

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */

const getProjection = (fieldASTs) => {
    return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
        projections[selection.name.value] = true;
        return projections;
    }, {});
};

const productType = new GraphQLObjectType({
    name: 'product',
    description: 'product item',
    fields: () => ({
        itemId: {
            type: GraphQLInt,
            description: 'Product ID.',
        },
        title: {
            type: GraphQLString,
            description: 'Product name.',
        },
        description: {
            type: GraphQLString,
            description: 'Product description',
        },
        price: {
            type: GraphQLFloat,
            description: 'Product price',
        },
    })
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            product: {
                type: new GraphQLList(productType),
                args: {
                    itemId: {
                        name: 'itemId',
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: (root, {itemId}, source, fieldASTs) => {
                    const projections = getProjection(fieldASTs);

                    return (new Promise((resolve, reject) => {
                        ProductMongo.find({itemId}, projections,(err, products) => {
                            err ? reject(err) : resolve(products)
                        })
                    }));
                }
            }
        }
    })

});

module.exports = schema;