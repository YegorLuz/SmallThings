import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    render () {
        const { colorPalette: { primary : { main } }, companyInfo: { name, slogan, logo } } = this.props;

        return (
            <HeaderContainer>
                <Container>
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
                                <Greeting>Hello, guest!</Greeting>
                                <Icon className='fa-user' styles={{ color: main, fontSize: '18px' }}/>
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
    onSelect: () => null,
};

Header.propTypes = {
    colorPalette: PropTypes.object.isRequired,
    companyInfo: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
};

export default Header;