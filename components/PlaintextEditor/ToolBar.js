import React , {Component, useEffect, useState} from 'react';
import {Container, ToolBarItem,Bar, FontSizeContainer, ColorContainer} from './common';
import {RichUtils, Modifier, EditorBlock} from 'draft-js';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBold, faItalic, faUnderline, faMinus, faPlus, faPaintBrush} from '@fortawesome/free-solid-svg-icons';
import {ToolBarButton, ColorButton} from './ToolBarButton';
import {colorStyleMap, fontStyleMap} from './StyleMaps';
import {convertToRaw} from 'draft-js';
import { toInteger } from 'lodash';
import createStyles from 'draft-js-custom-styles';
import {EditorState} from 'draft-js';

export function onClick_save(editorState,filename) {
    console.log("save");
    const raw = convertToRaw(editorState.getCurrentContent());
    console.log(JSON.stringify(raw));
    var fs = require('browserify-fs');
    fs.writeFile('/files' + filename, JSON.stringify(raw));
}


export default function ToolBar(props) {
    

    const {editorState, setEditorState, filename} = props;
    const { styles, customStyleFn, exporter } = createStyles(['font-size', 'color', 'text-transform']);
    
    const applyStyle = (style) => {
        if(style) {
            setEditorState(RichUtils.toggleInlineStyle(editorState,style));
           // setEditorState(RichUtils.toggleBlockType(editorState,));
            //setEditorState(RichUtils.toggleInlineStyle(editorState,"ALIGNCENTER"));
        }else {
            console.log("save");
            const raw = convertToRaw(editorState.getCurrentContent());
            console.log(JSON.stringify(raw));
            var fs = require('browserify-fs');
            fs.writeFile('/files' + filename, JSON.stringify(raw), function() {
              fs.readFile('/files' + filename, function(err, data) {
                console.log(JSON.parse(data));
                console.log("hi");
                
              });
            });


        }
        
    }
    useEffect(()=>{
        
        var currentStyle = editorState.getCurrentInlineStyle();
        var selection = editorState.getSelection();
        for(var i = 17; i <= 27; i++) {
            if(currentStyle.has(i)) {
                document.getElementById("FontSize").textContent = i;
                break;
            }else {
                document.getElementById("FontSize").textContent = 17;
            }
        }
        
    },[editorState.getSelection()]);


   
    
    const changeText = ( value) => {

        console.log(editorState);

        var currentStyle = editorState.getCurrentInlineStyle();
        var selection = editorState.getSelection();
        console.log(currentStyle);
        var oldValue = toInteger(document.getElementById("FontSize").textContent);
        var newValue = toInteger(document.getElementById("FontSize").textContent) + value;
        if(newValue >=17 && newValue <= 27) {
            const nextContentState = Object.keys(fontStyleMap).reduce((contentState,fontSize)=>{ 
                console.log(fontSize);
                return Modifier.removeInlineStyle(contentState,selection,toInteger(fontSize))}, editorState.getCurrentContent());
            console.log(nextContentState);
            let nextEditorState = EditorState.push(
                editorState,
                nextContentState,
                'change-inline-style'
              );

            
            
            setEditorState(RichUtils.toggleInlineStyle(nextEditorState,newValue));
            document.getElementById("FontSize").textContent = newValue;
        }
    };

    const changeColor = (style) =>{
        console.log(style);
        var currentStyle = editorState.getCurrentInlineStyle();
        var selection = editorState.getSelection();
        console.log(currentStyle);
        
       
        
        const nextContentState = Object.keys(colorStyleMap).reduce((contentState,color)=>{ 
            console.log(color);
            return Modifier.removeInlineStyle(contentState,selection,color)
        }, editorState.getCurrentContent());
        console.log(nextContentState);
        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
            );

        
        
        setEditorState(RichUtils.toggleInlineStyle(nextEditorState,style));
        
        
    }
    
    return (
        <div>
        <Container>
            
        {ToolBarButton.map((item,idx) =>{
            return <ToolBarItem key = {`${item.label}-${idx}`} onClick={() => applyStyle((item.style))}>
                {item.icon || item.label}
            </ToolBarItem>
        })}
        
        <FontSizeContainer>
            <ToolBarItem><FontAwesomeIcon icon = {faMinus} onClick = {() => changeText(-1)}></FontAwesomeIcon></ToolBarItem>
            <ToolBarItem id = "FontSize">17</ToolBarItem>
            <ToolBarItem><FontAwesomeIcon icon = {faPlus} onClick = {() => changeText( 1)}></FontAwesomeIcon></ToolBarItem>
        </FontSizeContainer>

        <ColorContainer>
        <ToolBarItem style = {{cursor: "auto"}}><FontAwesomeIcon icon = {faPaintBrush}></FontAwesomeIcon></ToolBarItem>:
        {ColorButton.map((item,idx) =>{
            return <ToolBarItem key = {`${item.label}-${idx}`} style = {{backgroundColor: `${item.style}`}} onClick = {()=>changeColor(item.style)}> </ToolBarItem>
        })}
        </ColorContainer>
        


        </Container>
        </div>
    
    )


}