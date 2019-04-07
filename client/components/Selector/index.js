import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    SelectorCont,
    Input,
    List,
    ListItem,
} from './elements';

class Selector extends Component {
    constructor (props) {
        super(props);

        this.state = {
            show: false,
        };

        this.onRef = this.onRef.bind(this);
        this.onRefList = this.onRefList.bind(this);
        this.onClickOutside = this.onClickOutside.bind(this);
        this.onClickListItem = this.onClickListItem.bind(this);
        this.toggle = this.toggle.bind(this);
        this.hide = this.hide.bind(this);

        this.selector = null;
        this.list = null;
    }

    componentDidMount () {
        document.addEventListener('click', this.onClickOutside);
    }

    componentWillUnmount () {
        document.removeEventListener('click', this.onClickOutside);
    }

    onRef (node) {
        this.selector = node;
    }

    onRefList (node) {
        this.list = node;
    }

    onClickOutside (event) {
        if (!this.selector || !this.selector.contains(event.target)) {
            this.hide();
        }
    }

    onClickListItem (id) {
        this.props.onSelect(id);
        this.hide();
    }

    toggle () {
        if (this.list && !this.list.contains(event.target)) {
            this.setState(state => ({
                show: !state.show,
            }));
        }
    }

    hide () {
        this.setState({
            show: false,
        });
    }

    render () {
        const { show } = this.state;

        return (
            <SelectorCont width='200px' onClick={this.toggle} ref={this.onRef}>
                <Input placeholder='Select location' disabled />
                <List ref={this.onRefList} color='#2196f3' className={classNames({ show })}>
                    <ListItem onClick={() => this.onClickListItem(1)}>1</ListItem>
                    <ListItem onClick={() => this.onClickListItem(2)}>2</ListItem>
                    <ListItem onClick={() => this.onClickListItem(3)}>3</ListItem>
                </List>
            </SelectorCont>
        );
    }
}

Selector.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

export default Selector;