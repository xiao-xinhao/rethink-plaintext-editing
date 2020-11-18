import React, { useEffect, useState } from 'react';
import {Container, TextArea,Code,Previewer,EditArea, PreviewArea} from './common';
import Editor from 'react-simple-code-editor';


import css from './style.css';
import Minimap from 'react-simple-minimap'
import  {Prism as SyntaxHighlighter}  from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/cjs/styles/hljs/docco';
import {dark} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Prism from "prismjs";
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

export default function CodeEditor(props) {

    const {textValue,name} = props;
    const [text, setText] = useState("");
    const [str, setStr] = useState("");
    //const Prism = require('prismjs');
    useEffect(() =>{
        console.log(textValue);
        if(textValue) {
           
            //console.log(textValue.toString());
            setText(textValue.toString());
            //Prism.highlightAll();
            
            document.getElementById("hightlighter").value = textValue ;
            
        }
    },[textValue]);


    useEffect(()=>{
        console.log(text);
        
    },[text])

    const onTextChange = e => {
       
        setText(e.currentTarget.value);
        
        var newValue = e.currentTarget.value;
        console.log(newValue);
        var fs = require('browserify-fs');
        if(newValue == "") {
            newValue = " ";
        }
        fs.writeFile('/files/' + name, newValue,function() {
            console.log("saved");
            fs.readFile('/files/' + name, function(err, data) {
              console.log(data.toString());
              console.log("read");
              
            });
        });
        
       
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
            
            {/* <Minimap of={<CodePreview/>} width={400} height = {1000}></Minimap> */}
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
            {/* {<pre className = {css.output}>
                <code  className={`language-js`}>{textValue}</code>
            </pre> } */}
                    

            
                <CodePreview></CodePreview>
            
            
        </Container>
        </ScrollSync>
    );
}
