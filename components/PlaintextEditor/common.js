import styled from "styled-components";


export const Container = styled.div`
width: 100%;
height: 45px;
border-bottom: 1px solid var(--color-border);
display: flex;
font-size: 14px;
font-weight: 600;
color: var(--color-text-dark-mute);
padding: 0 20px;
line-height: 40px;
background-color: var(--color-white);
align-items: center;
border: 1px solid var(--color-border);

    
`;

export const ToolBarItem = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    margin-left: 5px;
    font-size: 16px;
    align-items: center;
    box-shadow: 0px 1px 11px 1px rgba(15,15,15,0.2);
    cursor: pointer;

    &:hover {
        transform: translateY(1px);
        color: #34495e;
        background-color: transparent;
        box-shadow: none;
        border: 1px solid #34495e;
    }
`;

export const Bar = styled.div`
    
width: 100%;
height: 100%;
border-bottom: 1px solid var(--color-border);
font-size: 17px;
font-weight: 600;
overflow: auto;
padding: 0 20px;

background-color: var(--color-white);
`;

export const FontSizeContainer = styled.div`

height: 45px;
border-bottom: 1px solid var(--color-border);
display: flex;
font-size: 14px;
font-weight: 600;
color: var(--color-text-dark-mute);

line-height: 40px;
background-color: var(--color-white);
align-items: center;
border-right: 1px solid gray;
padding-right: 10px;
margin-right: 10px;
`;

export const ColorContainer = styled.div`

height: 45px;
border-bottom: 1px solid var(--color-border);
display: flex;
font-size: 14px;
font-weight: 600;
color: var(--color-text-dark-mute);

line-height: 40px;
background-color: var(--color-white);
align-items: center;

`;


