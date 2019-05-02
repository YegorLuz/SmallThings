import styled from 'styled-components';

export const Wrapper = styled.div`
    overflow: hidden;
`;

export const Table = styled.table`
    width: calc(100% + 20px);
    border-collapse: separate;
    border-spacing: 10px;
    margin: -10px;
`;

export const Row = styled.tr`
    width: 100%;
`;

export const Cell = styled.td.attrs(({ bgImage }) => ({
    bgImage,
}))`
    background: url(${props => props.bgImage}) center center no-repeat;
    background-size: cover;
    height: 192px;
    width: 20%;
    cursor: pointer;
`;

export const ContentContainer = styled.a`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

export const Text = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 30px;
    background: rgba(0, 0, 0, 0.75);
    font-size: 16px;
    font-weight: 500;
    color: #FFF;
    padding: 0 10px;
`;