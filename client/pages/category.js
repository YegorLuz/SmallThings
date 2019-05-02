import React, { Component } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import CategoryBody from '../containers/Category';
import { initCategoryPage } from '../actions/pages';
import { saveCategory } from '../actions/category';

class Category extends Component {
    static async getInitialProps({ req, store, query: { categoryId = null, storeId = null } }) {
        store.dispatch(initCategoryPage({ categoryId, storeId }));
        store.dispatch(saveCategory(categoryId));
        return {};
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Catalog</title>
                    <link rel="shortcut icon" type="image/png" href="/assets/icons/favicon.ico"/>
                </Head>
                <Header />
                <Body className='upc'>
                    <CategoryBody />
                </Body>
                <Footer />
            </div>
        );
    }
}

export default Category;
