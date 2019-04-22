import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import RegistrationForm from '../components/RegistrationForm';
import { initRegistrationPage } from '../actions/pages';
import { registerUser } from '../actions/user';

class Registration extends Component {
    static async getInitialProps({ req, store }) {
        store.dispatch(initRegistrationPage());
        return { };
    }

    constructor (props) {
        super(props);

        this.onRegister = this.onRegister.bind(this);
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

    onRegister (data) {
        const { register } = this.props;
        register(data);
    }

    render () {
        return (
            <div>
                <Head>
                    <title>Registration</title>
                    <link rel="shortcut icon" type="image/png" href="/assets/icons/favicon.ico"/>
                </Head>
                <Header />
                <Body className='upc'>
                    <RegistrationForm onSubmit={this.onRegister} />
                </Body>
                <Footer />
            </div>
        );
    }
}

Registration.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    register: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
    loggedIn: store.user.loggedIn,
});

const mapDispatchToProps = dispatch => ({
    register: () => dispatch(registerUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);