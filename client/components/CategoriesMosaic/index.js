import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '../common/elements';
import { Wrapper, Table, Row, Cell, ContentContainer, Text } from './elements';

const CategoriesMosaic = ({ data }) => {
    return (
        <Container overflow={'hidden'}>
            <Wrapper>
                <Table>
                    <tbody>
                        {data.map(row => <Row key={`row_${row[0]._id}`}>
                            {row.map(item =>
                                <Cell
                                    key={`cell_${item._id}`}
                                    bgImage={item.img}
                                    colSpan={item.direction === 'row' && item.span > 1 ? item.span : null}
                                    rowSpan={item.direction === 'column' && item.span > 1 ? item.span : null}
                                >
                                    <ContentContainer href={`/category/${item._id}`}>
                                        <Text>
                                            {item.title}
                                        </Text>
                                    </ContentContainer>
                                </Cell>
                            )}
                        </Row>)}
                    </tbody>
                </Table>
            </Wrapper>
        </Container>
    );
};

CategoriesMosaic.propTypes = {
    data: PropTypes.array.isRequired,
};

export default CategoriesMosaic;