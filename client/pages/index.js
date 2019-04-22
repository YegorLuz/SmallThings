import React, {Component} from 'react';
import {connect} from 'react-redux';
import Head from 'next/head';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import CategoriesMosaic from '../components/CategoriesMosaic';
import { initHomePage } from '../actions/pages';

class Home extends Component {
    static async getInitialProps({req, store}) {
        store.dispatch(initHomePage());
        return { };
    }

    render() {
        const { categories } = this.props;

        return (
            <div>
                <Head>
                    <title>Ukrainian Product Cluster</title>
                    <link rel="shortcut icon" type="image/png" href="/assets/icons/favicon.ico"/>
                </Head>
                <Header />
                <Body className='upc'>
                    {categories && categories.length > 0 && <CategoriesMosaic data={categories}/>}
                </Body>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    categories: store.category.categories,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
