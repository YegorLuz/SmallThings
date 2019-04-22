import styled from 'styled-components';

export const FooterContainer = styled.footer.attrs(({ main }) => ({
    mainColor: main,
}))`
    display: block;
    width: 100%;
    background-color: ${props => props.mainColor};
`;