/**
 * Utility function for creating models from schema and source provided.
 * We use convention over configuration approach to define the schema.
 * This function also recognizes complex sources, e.g. arrays of custom objects.
 * Using a simple type validation check the read-only properties are defined for created models.
 * @ignore
 * @param {Object} schema - name of attribute.
 * @returns {Function|Model} Model - constructor function for a model.
 */
const createModel = schema =>
    function Model(source) {
        Object.keys(schema).forEach(key => {
            /* eslint complexity: 0 */
            const { key: originalKey, type, oneOfType, model: ChildModel, optional } = schema[key];

            if (!source) return;
            let value = source[originalKey];

            if (optional && !value) return;

            if (Array.isArray(value)) {
                if (ChildModel) {
                    value = value.map(val => new ChildModel(val));
                }
            } else {
                if (ChildModel) {
                    value = new ChildModel(value);
                }

                if (!type && !oneOfType) {
                    throw new Error(`Model validation error: ${originalKey} has no type or oneOfType specified`);
                }

                if (type && typeof value !== type) {
                    throw new Error(`Model validation error: ${originalKey} is not of type ${type}. The value is ${value}`);
                }

                if (oneOfType) {
                    if (!Array.isArray(oneOfType)) {
                        throw new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
                    }
                    let hasType = false;
                    for (let i = 0; i < oneOfType.length; i += 1) {
                        const typeChecker = oneOfType[i];
                        if (typeof value === typeChecker) {
                            hasType = true;
                            break;
                        }
                    }

                    if (!hasType) {
                        const valuesString = JSON.stringify(oneOfType);
                        throw new Error(
                            `Model validation error: ${originalKey} is not one of types ${valuesString}. The value is ${value}`,
                        )
                    }
                }
            }

            Object.defineProperty(this, key, { value, writable: false, enumerable: true, configurable: true });
        });
    };

export default createModel;
