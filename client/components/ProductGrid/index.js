import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Item, A, Actions, Price, AddToCart, ImageHolder, Image, Title, Options, Option, Description } from './elements';

class ProductGrid extends Component {
    render () {
        const { data, categoryId } = this.props;

        return (
            <Grid>
                {data.map(item => (
                    <Item key={item._id}>
                        <A href={`/category/${categoryId}/product/${item._id}`}>
                            <ImageHolder>
                                <Image src={item.image} alt={item.title}/>
                            </ImageHolder>
                            <Title>{item.title}</Title>
                            {item.options ? (
                                <Options>
                                    {item.options.params.map(opt => <Option key={opt._id} type={item.options.type} param={opt.value}>{item.options.type === 'size' ? opt.value : ''}</Option>)}
                                </Options>
                            ) : null}
                            <Description>{item.description}</Description>
                        </A>
                        <Actions>
                            <Price>$ {item.price}</Price>
                            <AddToCart>Add to cart</AddToCart>
                        </Actions>
                    </Item>
                ))}
            </Grid>
        );
    }
}

ProductGrid.defaultProps = {
    products: [],
    categoryId: '',
    storeId: '',
};

ProductGrid.propTypes = {
    data: PropTypes.array,
    categoryId: PropTypes.string,
};

const mapStateToProps = store => ({
    data: store.product.products,
    categoryId: store.category.categoryId,
    storeId: store.company._id,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);