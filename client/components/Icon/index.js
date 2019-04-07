import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Icon = ({ className, styles }) => <i className={classNames('fas', className)} style={styles}/>;

Icon.defaultProps = {
    styles: {},
};

Icon.propTypes = {
    className: PropTypes.string.isRequired,
    styles: PropTypes.object,
};

export default Icon;