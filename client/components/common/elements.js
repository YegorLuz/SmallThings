import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    body {
        text-size-adjust: 100%;
        font-family: Roboto, sans-serif;
        margin: 0;
    }
`;

export const Container = styled.div`
    width: 1500px;
    margin: 0 auto;
    padding: 20px 0 0;
	position: relative;
`;