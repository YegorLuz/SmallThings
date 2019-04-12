import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import { withReduxSaga } from '../store/';

class AppRoot extends App {
  static async getInitialProps({ Component, ctx, router: { query } }) {
    const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent;

    let pageProps = {};
    if (Component.getInitialProps) {
      try {
        pageProps = await Component.getInitialProps(ctx);
      } catch (err) {
        console.log('_app.js -> AppRoot', err);
      }
    }

    return {
      pageProps,
      statusCode: ctx.res && ctx.res.statusCode,
      userAgent,
    };
  }

  render () {
    const { Component: Page, store, pageProps, userAgent } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Page {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withReduxSaga(AppRoot);
