import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMenu } from '../../actions/menu';

class Footer extends Component {
    async componentDidMount () {
        const { menu, getMenu } = this.props;
        if (!menu.length) {
            getMenu();
        }
    }

    render () {
        const { menu } = this.props;
        console.log(menu);

        return (
            <div>footer</div>
        );
    }
}

Footer.propTypes = {
    menu: PropTypes.array.isRequired,
};

const mapStateToProps = store => ({
    menu: store.menu.pages,
});

const mapDispatchToProps = dispatch => ({
    getMenu: () => dispatch(getMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);