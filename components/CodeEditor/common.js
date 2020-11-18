import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 13px;
   

`;
export const EditArea = styled.div`
    height: 100%;
    width: 80%;
    positon: absolute;
    

`;

export const PreviewArea = styled.div`
    float: right;
    width: 600px;
    height:4000px;
    
`;

export const TextArea = styled.textarea`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
padding: 1rem;
border: none;
font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
font-size: 0.8rem;
background: transparent;
white-space: pre-wrap;
line-height: 1.5em;
word-wrap: break-word;
font-size: 1rem;
`;

export const Code = styled.div`

    
    width: 100%;
    height: 600px;
    padding: 1rem;
    display: block;
    background: transparent;
    margin: 0;
    font-size: 0.8rem;
    font-family: "PT Mono", monospace;
    

`;

export const Output = styled.pre`
width: 100%;
height:100%;
resize: none;
border: none;
outline: none;
overflow: auto;
background: transparent;
  margin: 0;
`;

export const Previewer = styled.textarea`
    width: 100%;
    height: 100%;
    overflow: visible;
`;