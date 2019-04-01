import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { init } from '../actions/home';
import { formatPrice } from '../utils/formatter';

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      clicked: 0,
    };

    this.onClick = this.onClick.bind(this);
  }

  static async getInitialProps({ req, store }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    store.dispatch(init());
    return { userAgent };
  }

  onClick () {
    this.setState(state => ({ clicked: state.clicked + 1 }));
  }

  render () {
    const { userAgent, products } = this.props;
    const { clicked } = this.state;

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
        <ul className='products'>
          {products.map(item => <li key={item._id}>
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>{formatPrice(item.price)}</p>
          </li>)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  test: store.home.test,
  products: store.home.products,
});

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(init()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
