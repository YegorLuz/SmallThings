import React from 'react';
import {Provider} from 'react-redux';
import App, {Container} from 'next/app';
import { withReduxSaga } from '../store/';
import { rehydrate } from '../actions/pages';

class AppRoot extends App {
    static async getInitialProps({ Component, ctx }) {
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
        };
    }

    componentDidMount () {
        const { store } = this.props;
        store.dispatch(rehydrate());
    }

    render() {
        const { Component: Page, store, pageProps } = this.props;

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
