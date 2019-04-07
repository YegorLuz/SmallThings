import styled from 'styled-components';

export const SelectorCont = styled.div.attrs(({ width, ref, onClick }) => ({
    width: width || 'auto',
    ref,
    onClick,
}))`
    position: relative;
    margin-right: 20px;
    width: ${props => props.width};
    cursor: pointer;
    
    &:after {
        content: "";
        position: absolute;
        top: 18px;
        right: 12px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 5px solid #666;
        z-index: 3;
    }
`;

export const Input = styled.input.attrs(({ placeholder, disabled }) => ({
    placeholder,
    disabled,
}))`
    color: #666;
    font-size: 18px;
    padding: 8px 35px 8px 12px;
    border: 1px solid #2196f3;
    border-radius: 20px;
    width: 200px;
    height: 40px;
    background: transparent;
    outline: none;
    position: relative;
    z-index: 2;
    cursor: pointer;
    
    &::placeholder {
        color: 999;
    }
`;

export const List = styled.ul.attrs(({ color, className, ref }) => ({
    borderColor: color || '#2196f3',
    className,
    ref,
}))`
    position: absolute;
    top: 45px;
    left: 0;
    height: 0;
    z-index: 1;
    list-style: none;
    background: #fff;
    overflow: hidden;
    max-height: 0;
    width: 100%;
    border: 1px solid transparent;
    border-radius: 3px;
    transition: all 250ms ease-in;
    
    &.show {
        height: auto;
        max-height: 200px;
        border: ${props => `1px solid ${props.borderColor}`};
        transition: all 250ms ease-in;
    }
`;

export const ListItem = styled.li.attrs(({ onClick }) => ({
    onClick,
}))`
    padding: 8px 15px;
    font-size: 18px;
    
    &:not(:last-child) {
        border-bottom: 1px solid #666;
    }
`;
