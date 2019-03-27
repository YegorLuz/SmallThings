import React from 'react';
import App, { Container } from 'next/app';

class Error extends App {
    static async getInitialProps({ Component, ctx, router: { query } }) {
        const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent;

        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return {
            pageProps,
            statusCode: ctx.res && ctx.res.statusCode,
            userAgent,
        };
    }

    render () {
        const { pageProps, userAgent, statusCode } = this.props;

        return (
            <Container>
                <div>{statusCode}</div>
                <div>{userAgent}</div>
                <div>{JSON.stringify(pageProps)}</div>
            </Container>
        );
    }
}

export default Error;