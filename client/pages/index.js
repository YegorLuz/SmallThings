import React, {Component} from 'react';
import {connect} from 'react-redux';
import Head from 'next/head';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import CategoriesMosaic from '../components/CategoriesMosaic';
import { getCompanyInfo } from '../actions/company';
import { getCategories } from '../actions/category';

class Home extends Component {
    static async getInitialProps({req, store}) {
        // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
        store.dispatch(getCompanyInfo());
        store.dispatch(getCategories());
        return {};
    }

    render() {
        const {colorPalette, companyInfo, categories} = this.props;

        return (
            <div>
                <Head>
                    <title>My page title</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                    <link rel="shortcut icon" type="image/png" href="/assets/icons/favicon.ico"/>
                </Head>
                <Header colorPalette={colorPalette} companyInfo={companyInfo}/>
                <Body className='upc'>
                <CategoriesMosaic data={categories}/>
                </Body>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    colorPalette: store.colorPalette,
    companyInfo: store.company,
    categories: store.category.categories,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
