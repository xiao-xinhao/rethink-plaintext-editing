import React from "react";
import styled from "styled-components";

export const ToolBarContainer = styled.div`
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
`;

export const Container = styled.div`
    width: 50%;
    height: 100%;
    padding: 13px;
    border-right: 1.5px solid lightgray;

`;

export const ResultContainer = styled.div`
    width: 50%;
    height: 100%;
    padding: 13px;
    overflow: auto;
    
`;

export const TextArea = styled.textarea`
    width: 100%;
    height:100%;
    resize: none;
    border: none;
    outline: none;

`;

export const ResultArea = styled.div`
    width: 100%;
    height:100%;
    resize: none;
    border: none;
    outline: none;
    overflow: auto;

`;


export const ToolBarItem = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    margin-right: 5px;
    font-size: 16px;
    align-items: center;
    box-shadow: 0px 1px 11px 1px rgba(15,15,15,0.2);
    cursor: pointer;
`;