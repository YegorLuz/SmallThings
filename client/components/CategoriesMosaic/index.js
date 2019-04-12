import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '../common/elements';
import { Table, Row, Cell, ContentContainer, Text } from './elements';

const CategoriesMosaic = ({ data }) => {
    return (
        <Container>
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
                                <ContentContainer>
                                    <Text>
                                        {item.name}
                                    </Text>
                                </ContentContainer>
                            </Cell>
                        )}
                    </Row>)}
                </tbody>
            </Table>
        </Container>
    );
};

CategoriesMosaic.propTypes = {
    data: PropTypes.array.isRequired,
};

export default CategoriesMosaic;