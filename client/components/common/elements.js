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

export const Container = styled.div.attrs(({ padding = null }) => ({
    padding,
}))`
    max-width: 1500px;
    width: 100%;
    margin: 0 auto;
    ${props => props.padding ? `padding: ${props.padding};` : ''}
	position: relative;
`;

export const Form = styled.div`
    max-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
`;

export const FormTitle = styled.h3`
    width: 100%;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 30px;
`;

export const FormRow = styled.div`
    width: 100%;
    margin-bottom: 15px;
    position: relative;
    display: flex;
    justify-content: center;
`;

export const Input = styled.input`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
    padding: 0 20px;
    border: 1px solid #666;
    border-radius: 20px;
`;

export const Button = styled.button`
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 600;
    margin-top: 20px;
    padding: 0 30px;
    color: #fff;
    border: 0;
    background: #3a5a99;
    border-radius: 3px;
    cursor: pointer;
`;

export const Link = styled.a.attrs(({ color }) => ({
    color,
}))`
    color: ${props => props.color};
`;