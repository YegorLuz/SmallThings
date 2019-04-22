import React, {Component} from 'react';
import {connect} from 'react-redux';
import Head from 'next/head';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';
import { login } from '../actions/user';
import { initLoginPage } from '../actions/pages';

class Login extends Component {
    static async getInitialProps({ req, store }) {
        store.dispatch(initLoginPage());
        return { };
    }

    constructor (props) {
        super(props);

        this.onLogin = this.onLogin.bind(this);
        this.goHome = this.goHome.bind(this);
    }

    componentDidMount () {
        this.goHome();
    }

    componentDidUpdate() {
        this.goHome();
    }

    goHome () {
        const { loggedIn } = this.props;

        if (loggedIn) {
            location.pathname = '/';
        }
    }

    onLogin (email, password) {
        const { doLogin } = this.props;
        doLogin({ email, password });
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Login</title>
                    <link rel="shortcut icon" type="image/png" href="/assets/icons/favicon.ico"/>
                </Head>
                <Header />
                <Body className='upc'>
                    <LoginForm onSubmit={this.onLogin} />
                </Body>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    loggedIn: store.user.loggedIn,
});

const mapDispatchToProps = dispatch => ({
    doLogin: data => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);