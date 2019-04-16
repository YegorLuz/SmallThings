import styled from 'styled-components';

export const Aside = styled.aside`
    min-width: 300px;
    box-shadow: 1px 1px 3px 0 rgba(0,0,0,0.5);
`;

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    list-style: none;
    flex-grow: 1;
`;

export const Item = styled.li`
    border-bottom: 1px solid #333;
`;

export const A = styled.a`
    display: flex;
    align-items: center;
    padding: 10px 15px;
    color: #0000aa;
    text-decoration: none;
`;