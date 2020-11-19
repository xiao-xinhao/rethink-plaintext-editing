import React, { useEffect, useState } from 'react';
import {Container, TextArea,Code,Previewer,EditArea, PreviewArea} from './common';
import ToolBar from './ToolBar';

import css from './style.css';
import  {Prism as SyntaxHighlighter}  from 'react-syntax-highlighter';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

export default function CodeEditor(props) {

    const {textValue,name} = props;
    const [text, setText] = useState("");
    useEffect(() =>{
        if(textValue) {
            setText(textValue.toString());
            
            document.getElementById("hightlighter").value = textValue ;
            
        }
    },[textValue]);


   

    const onTextChange = e => {
       
        setText(e.currentTarget.value);
        
        var newValue = e.currentTarget.value;
        
        var fs = require('browserify-fs');
        if(newValue == "") {
            newValue = " ";
        }

    }
   
    

    const CodePreview = () => {

        return (
            <SyntaxHighlighter   
            className = {css.preview}
                id = "hightlighter"
               
                language="javascript"
                customStyle = {{fontSize: "2px", margin: "0px", overflow: "auto"}}

            >
            
            {text}
            
            </SyntaxHighlighter> 

        )

    };

    

    return (
        <ScrollSync>
        <Container>
            <ToolBar name = {name} text = {text}></ToolBar>
            
            <ScrollSyncPane>
                { <textarea className={css.input} value={text} onChange = {onTextChange} > {textValue} </textarea>  }
             </ScrollSyncPane>
             <ScrollSyncPane>
                <SyntaxHighlighter   
                className = {css.output}
                    id = "hightlighter"
                
                    language="javascript"
                    customStyle = {{background: "none", margin: "0px", overflow: "auto"}}
                    
                    
                >
                
                {text}
                
                </SyntaxHighlighter> 
            </ScrollSyncPane>

            <CodePreview></CodePreview>
            
            
        </Container>
        </ScrollSync>
    );
}
