import React, { Component } from 'react';
import SideBar from '../../components/SideBar';
import ProductGrid from '../../components/ProductGrid';
import { Container } from '../../components/common/elements';
import { Catalog, Products } from './elements';

class CatalogBody extends Component {
    render () {
        return (
            <Container>
                <Catalog>
                    <SideBar />
                    <Products>
                        <ProductGrid />
                    </Products>
                </Catalog>
            </Container>
        );
    }
}

export default CatalogBody;