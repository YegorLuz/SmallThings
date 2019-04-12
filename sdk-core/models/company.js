import createModel from './base';
import { PrimaryColor } from './colorPalette';

const ColorPalette = createModel({
    primary: { key: 'primary', type: 'object', model: PrimaryColor, optional: true },
});

const CompanyInfo = createModel({
    name: { key: 'name', type: 'string', optional: true },
    slogan: { key: 'slogan', type: 'string', optional: true },
    logo: { key: 'logo', type: 'string', optional: true },
});

const Company = createModel({
    colorPalette: new ColorPalette(),
    companyInfo: new CompanyInfo(),
});

export { Company, CompanyInfo, ColorPalette };