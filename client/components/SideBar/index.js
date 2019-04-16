import React, { Component } from 'react';
import { Aside, List, Item, A } from './elements';

const categoryTestData = [
    {
        _id: '1',
        url: 'cat1',
        title: 'Category 1',
    },
    {
        _id: '2',
        url: 'cat2',
        title: 'Category 2',
    },
    {
        _id: '3',
        url: 'cat3',
        title: 'Category 3',
    },
    {
        _id: '4',
        url: 'cat4',
        title: 'Category 4',
    },
    {
        _id: '5',
        url: 'cat5',
        title: 'Category 5',
    },
];

class SideBar extends Component {
    render () {
        return (
            <Aside>
                <List>
                    {categoryTestData.map(item => (
                        <Item key={item._id}>
                            <A href={item.url}>{item.title}</A>
                        </Item>
                    ))}
                </List>
            </Aside>
        );
    }
}

export default SideBar;