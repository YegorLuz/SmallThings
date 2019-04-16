import React, { Component } from 'react';
import { Grid, Item, A, Actions, Price, AddToCart, ImageHolder, Image, Title, Options, Option, Description } from './elements';

const testData = [
    {
        _id: '1',
        title: 'Product 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi, asperiores cumque dignissimos laudantium pariatur praesentium quos. A ad adipisci, aliquam cupiditate delectus dolor esse et explicabo harum id impedit iure minus mollitia non nulla perspiciatis porro quia quod ratione repellat sapiente sed sunt velit. Beatae consectetur ex labore minima quis veritatis voluptas.',
        image: '/assets/images/products/prod-1.jpg',
        price: 299.99,
        options: {
            type: 'color',
            params: [
                {
                    _id: '1',
                    value: '#f00',
                    priceModifier: 0.0,
                },
                {
                    _id: '2',
                    value: '#0f0',
                    priceModifier: 0.0,
                },
                {
                    _id: '3',
                    value: '#00f',
                    priceModifier: 0.0,
                },
            ],
        },
    },
    {
        _id: '2',
        title: 'Product 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi deserunt dignissimos dolores eius ex illum ipsum libero minima, mollitia odio odit officiis quidem similique, tempora temporibus? Ab, impedit ipsa laboriosam maiores numquam perferendis.',
        image: '/assets/images/products/prod-2.jpg',
        price: 299.99,
        options: null,
    },
    {
        _id: '3',
        title: 'Product 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid dolorem dolorum eveniet, explicabo harum minus, neque nulla praesentium reprehenderit sequi, sit sunt.',
        image: '/assets/images/products/prod-3.jpg',
        price: 299.99,
        options: null,
    },
    {
        _id: '4',
        title: 'Product 4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, vitae voluptas?',
        image: '/assets/images/products/prod-4.jpg',
        price: 299.99,
        options: {
            type: 'size',
            params: [
                {
                    _id: '1',
                    value: 'S',
                    priceModifier: 0.0,
                },
                {
                    _id: '2',
                    value: 'M',
                    priceModifier: 0.0,
                },
                {
                    _id: '3',
                    value: 'L',
                    priceModifier: 0.0,
                },
                {
                    _id: '4',
                    value: 'XL',
                    priceModifier: 0.0,
                },
            ],
        },
    },
    {
        _id: '5',
        title: 'Product 5',
        description: 'Lorem ipsum dolor sit amet.',
        image: '/assets/images/products/prod-5.jpg',
        price: 299.99,
        options: null,
    },
    {
        _id: '6',
        title: 'Product 6',
        description: 'Lorem ipsum.',
        image: '/assets/images/products/prod-6.jpg',
        price: 299.99,
        options: null,
    },
    {
        _id: '7',
        title: 'Product 7',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque molestias nihil quos tempore?',
        image: '/assets/images/products/prod-7.jpg',
        price: 299.99,
        options: null,
    }
];

class ProductGrid extends Component {
    render () {
        return (
            <Grid>
                {testData.map(item => (
                    <Item key={item._id}>
                        <A href={`/product/${item._id}`}>
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

export default ProductGrid;