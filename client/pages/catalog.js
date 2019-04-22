import React, {Component} from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import CatalogBody from '../containers/Catalog';
import { getCompanyInfo } from '../actions/company';
import { getProducts } from '../actions/product';

class Catalog extends Component {
    static async getInitialProps({req, store, query}) {
        console.log(query);
        store.dispatch(getCompanyInfo());
        store.dispatch(getProducts());
        return { access: (req.body || {}).access || false };
    }

    render() {
        const { colorPalette, companyInfo, products, access } = this.props;
        console.log('products', access, products);

        return (
            <div>
                <Head>
                    <title>Catalog</title>
                    <link rel="shortcut icon" type="image/png" href="/assets/icons/favicon.ico"/>
                </Head>
                <Header colorPalette={colorPalette} companyInfo={companyInfo}/>
                <Body className='upc'>
                    <CatalogBody />
                </Body>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    colorPalette: store.colorPalette,
    companyInfo: store.company,
    products: store.product.products,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);