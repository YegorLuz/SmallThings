import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Aside, List, Item, A } from './elements';

class SideBar extends Component {
    render () {
        const { categories, storeId, categoryId } = this.props;
        const cats = categories.reduce((acc, item) => acc.concat(item), []);

        return (
            <Aside>
                <List>
                    {cats.map(item => (
                        <Item key={item._id} active={item._id === categoryId}>
                            <A href={`${storeId ? `/store/${storeId}` : ''}/category/${item._id}`}>{item.title}</A>
                        </Item>
                    ))}
                </List>
            </Aside>
        );
    }
}

SideBar.defaultProps = {
    storeId: '',
    categoryId: '',
    categories: [],
};

SideBar.propTypes = {
    categories: PropTypes.array,
    storeId: PropTypes.string,
    categoryId: PropTypes.string,
};

const mapStateToProps = store => ({
    categoryId: store.category.categoryId,
    categories: store.category.categories,
    storeId: store.company._id,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);