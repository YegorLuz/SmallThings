import React from 'react';
import PropTypes from 'prop-types';
import { Main } from './elements';

const Body = ({ className, children }) => (
    <Main className={className}>
        {children}
    </Main>
);

Body.propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Body;