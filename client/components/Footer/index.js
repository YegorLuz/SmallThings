import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FooterContainer } from './elements';
import { Container } from '../common/elements';

class Footer extends Component {
    render () {
        const { pages, colorPalette: { primary : { main } } } = this.props;

        return (
            <FooterContainer main={main}>
                <Container padding={'20px 0'}>
                    <ul>
                        {pages.filter(item => item.showInFooter).sort((i1, i2) => i1.order - i2.order).map(item => (
                            <li key={item._id}>
                                <a href={item.url}>{item.title}</a>
                            </li>
                        ))}
                    </ul>
                </Container>
            </FooterContainer>
        );
    }
}

Footer.propTypes = {
    pages: PropTypes.array.isRequired,
};

const mapStateToProps = store => ({
    pages: store.menu.pages,
    colorPalette: store.colorPalette,
    companyInfo: store.company,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);