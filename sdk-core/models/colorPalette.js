import createModel from './base';

const PrimaryColor = createModel({
    light: { key: 'light', type: 'string', optional: true },
    main: { key: 'main', type: 'string', optional: true },
});

const IndexPage = createModel({
    primary: { key: 'primary', type: 'object', model: PrimaryColor, optional: true },
});

export { PrimaryColor };