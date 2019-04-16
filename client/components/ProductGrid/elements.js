import styled from 'styled-components';

export const Grid = styled.ul`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px 10px;
    list-style: none;
`;

export const Item = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 1px 1px 4px 0 rgba(0,0,0,0.25);
    padding: 5px;
    border-radius: 3px;
`;

export const A = styled.a`
    text-decoration: none;
    color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-self: flex-end;
    margin-top: 20px;
`;

export const Price = styled.div`
    font-size: 18px;
    font-weight: 600;
`;

export const AddToCart = styled.button`
    margin-left: 10px;
    padding: 10px 15px;
    background: aquamarine;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    border: 0;
`;

export const ImageHolder = styled.div`
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    overflow: hidden;
`;

export const Image = styled.img`
    min-width: 200px;
    min-height: 200px;
    height: 100%;
    width: auto;
`;

export const Title = styled.h3`
    font-size: 16px;
    font-weight: 600;
    margin: 10px 0;
    width: 100%;
`;

export const Options = styled.p`
    display: flex;
    padding: 0 5px 10px;
    width: 100%;
`;

export const Option = styled.span.attrs(({ type, param }) => ({
    type,
    param,
}))`
    display: block;
    width: ${props => props.type === 'color' ? '15px' : 'auto'};
    height: ${props => props.type === 'color' ? '15px' : 'auto'};
    margin-right: 10px;
    ${props => props.type === 'color' ? `background: ${props.param};` : ''}
    color: ${props => props.type === 'size' ? '#cc33dd' : '#333'};
`;

export const Description = styled.p`
    font-size: 14px;
    margin: 0 0 10px;
    overflow: hidden;
    width: 100%;
    max-height: 50px;
`;