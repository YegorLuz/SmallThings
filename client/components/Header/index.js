import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { Container } from '../common/elements';
import {
    HeaderContainer,
    InnerContainer,
    CompanyContainer,
    LogoWrapper,
    Logo,
    LogoImage,
    LogoUnderline,
    Company,
    CompanyName,
    CompanySlogan,
    Right,
    Search,
    SearchInput,
    User,
    Greeting,
} from './elements';
import Icon from '../Icon';
import Selector from '../Selector';

class Header extends Component {
    constructor (props) {
        super(props);

        this.renderUser = this.renderUser.bind(this);
    }

    renderUser () {
        const { userData = {}, colorPalette: { primary : { main } }, loggedIn } = this.props;

        if (loggedIn && userData.email) {
            return (
                <Fragment>
                    <Greeting>Hello, {userData.firstName}!</Greeting>
                    <Icon className='fa-user' styles={{ color: main, fontSize: '18px' }}/>
                </Fragment>
            );
        }

        return <a href={'/login'}>Login</a>;
    }

    render () {
        const {
            companyInfo: {
                name,
                slogan,
                logo,
            },
        } = this.props;

        return (
            <HeaderContainer>
                <Container padding={'20px 0 0'}>
                    <InnerContainer>
                        <CompanyContainer href='/'>
                            <LogoWrapper>
                                <Logo>
                                    <LogoImage src={logo} alt='logo'/>
                                </Logo>
                            </LogoWrapper>
                            <Company>
                                <CompanyName>{name}</CompanyName>
                                <CompanySlogan>{ReactHtmlParser(slogan)}</CompanySlogan>
                            </Company>
                        </CompanyContainer>
                        <Right>
                            <Selector onSelect={this.props.onSelect} />
                            <Search>
                                <SearchInput placeholder='Search...' />
                            </Search>
                            <User>
                                {this.renderUser()}
                            </User>
                        </Right>
                    </InnerContainer>
                    <LogoUnderline className="logo-underline" />
                </Container>
            </HeaderContainer>
        );
    }
}

Header.defaultProps = {
    userData: {},
    onSelect: () => null,
};

Header.propTypes = {
    colorPalette: PropTypes.object.isRequired,
    companyInfo: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    onSelect: PropTypes.func,
};

const mapStateToProps = store => ({
    colorPalette: store.colorPalette,
    companyInfo: store.company,
    userData: store.user.userData,
    loggedIn: store.user.loggedIn,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);