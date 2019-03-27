import React, { Component } from 'react';
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Head from 'next/head';
import withData from '../lib/withData'

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      clicked: 0,
    };

    this.onClick = this.onClick.bind(this);
  }

  static async getInitialProps({ req, res }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    console.log('req', req);
    console.log('res', res);
    return { userAgent };
  }

  onClick () {
    this.setState(state => ({ clicked: state.clicked + 1 }));
  }

  render () {
    const { userAgent, data = {} } = this.props;
    const { clicked } = this.state;
    const reviews = data.allReviews || [];

    console.log(this.props);

    return (
      <div>
        <Head>
          <title>My page title</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <p onClick={this.onClick}>Welcome to Next.js! - {clicked}</p>
        <p>Hello {userAgent}</p>
        <img src="../assets/images/car.jpg" alt="my image" />
	<div className='reviews'>
	  {reviews.map(item => <div key={item.id}>
	    <p className='blue'>Slug: {item.slug}</p>
	    <p className='blue'>Rating: {item.rating}</p>
	    <p className='blue'>Created at: {item.createdAt}</p>
	    <p className='blue'>Title: {item.title}</p>
	  </div>)}
	</div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  test: store.home.test,
});

const mapDispatchToProps = dispatch => ({
  init: () => null,
});

const allReviews = gql`
  query allReviews {
    allReviews(orderBy: createdAt_DESC) {
      id
      slug
      rating
      createdAt
      title
    }
  }`;

export default connect(mapStateToProps, mapDispatchToProps)(withData(graphql(allReviews)(Home)));
