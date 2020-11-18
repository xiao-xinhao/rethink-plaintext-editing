import React, { useContext } from "react";
import {ResultContainer,ResultArea} from "./common";
import ReactMarkdown from 'react-markdown';
import EditorContext from './EditorContext';


export default function Result(props) {


    const {markdownText} = useContext(EditorContext);

    return(
        <ResultContainer>
            <ResultArea>
                <ReactMarkdown source= {markdownText}/>
            </ResultArea>
        </ResultContainer>
    );


}