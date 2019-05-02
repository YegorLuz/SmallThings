import React from 'react';
import SideBar from '../../components/SideBar';
import ProductGrid from '../../components/ProductGrid';
import { Container } from '../../components/common/elements';
import { Catalog, Products } from './elements';

const CategoryBody = () => (
    <Container>
        <Catalog>
            <SideBar />
            <Products>
                <ProductGrid />
            </Products>
        </Catalog>
    </Container>
);

export default CategoryBody;