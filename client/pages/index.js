import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import Header from '../components/Header';
import { getCompanyInfo } from '../actions/company';

class Home extends Component {
  static async getInitialProps({ req, store }) {
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    store.dispatch(getCompanyInfo());
    return {  };
  }

  render () {
    const { colorPalette, companyInfo } = this.props;

    return (
      <div>
        <Head>
          <title>My page title</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header colorPalette={colorPalette} companyInfo={companyInfo} />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  colorPalette: store.colorPalette,
  companyInfo: store.company,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
