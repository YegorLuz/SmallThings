import styled, { keyframes } from 'styled-components';

const logoAnim = keyframes`
	0% {
		margin-top: -100px; margin-left: 30px; width: 20px; height: 20px;
		animation-timing-function: ease-in;
	}
	21% {
		margin-top: 60px;
		animation-timing-function: ease-out;
	}
	42% {
		margin-top: 0px;
		animation-timing-function: ease-in;
	}
	60% {
		margin-top: 60px;
		animation-timing-function: ease-out;
	}
	75% {
		margin-top: 30px; margin-left: 30px; width: 20px; height: 20px;
		animation-timing-function: ease-in;
	}
	100% {
		margin-top: 0; margin-left: 0; width: 80px; height: 80px;
		animation-timing-function: ease-out;
	}
`;

const logoImgAnim = keyframes`
    0% {
		opacity: 0;
	}
	65% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`;

const logoUnderlineAnim = keyframes`
	0% {width: 0;}
  	61% {width: 0; animation-timing-function: ease-out;}
  	100% {width: 100%; animation-timing-function: ease-in;}
`;

export const HeaderContainer = styled.header`
    height: 110px;
    border-top: 5px solid #1769aa;
`;

export const InnerContainer = styled.div`
    position: relative;
  	z-index: 2;
  	display: flex;
    justify-content: space-between;
`;

export const CompanyContainer = styled.a.attrs(({ href }) => ({
    href,
}))`
    display: flex;
    flex-wrap: nowrap;
    text-decoration: none;
`;

export const LogoWrapper = styled.div`
    width: 80px;
    height: 80px;
    margin-right: 20px;
`;

export const Logo = styled.div`
    width: 80px;
    height: 80px;
	background: #2196f3;
	border-radius: 40px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	animation-name: ${logoAnim};
  	animation-duration: 1.5s;
`;

export const LogoImage = styled.img.attrs(({ src, alt }) => ({
    src,
    alt,
}))`
    max-width: 70%;
	max-height: 70%;
	animation-name: ${logoImgAnim};
  	animation-duration: 2.5s;
`;

export const LogoUnderline = styled.div.attrs(({ className }) => ({
    className,
}))`
	position: absolute;
	height: 110px;
	left: 0;
	bottom: 0;
	width: 100%;
	transition: 500ms width ease-out;
	background: url(../../assets/images/header-bg.png);
	animation-name: ${logoUnderlineAnim};
  	animation-duration: 2.5s;
  	z-index: 1;
`;

export const Company = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const CompanyName = styled.div`
    font-family: Impact, sans-serif;
    font-size: 32px;
    color: #1769aa;
    text-transform: uppercase;
    line-height: 32px;
`;

export const CompanySlogan = styled.div`
    font-family: Impact, sans-serif;
    font-size: 12px;
    color: #2196f3;
    text-transform: uppercase;
    letter-spacing: 3px;
`;

export const Right = styled.div`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
`;

export const Search = styled.div`
    position: relative;
    margin-right: 20px;
`;

export const SearchInput = styled.input`
    color: #666;
    font-size: 18px;
    padding: 8px 52px 8px 12px;
    border: 1px solid #2196f3;
    border-radius: 20px;
    width: 400px;
    height: 40px;
    background: transparent;
    outline: none;
    
    &::placeholder {
        color: 999;
    }
`;

export const User = styled.div`
    display: flex;
    flex-wrap: nowrap;
`;

export const Greeting = styled.div`

`;

export const Icon = styled.div`

`;