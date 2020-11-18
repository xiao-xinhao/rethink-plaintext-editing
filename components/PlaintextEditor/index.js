import React,  {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import css from './style.css';

import { Editor, EditorState, ContentState, convertToRaw, convertFromRaw, RichUtils, Modifier} from "draft-js";
import "draft-js/dist/Draft.css";
import {Bar } from './common';
import ToolBar from './ToolBar';
import {onClick_save} from './ToolBar';
import {fontStyleMap,colorStyleMap,Map} from './StyleMaps';
function PlaintextEditor({ file, write }) {

  const [value , setValue] = useState();
  const [name, setName] = useState();
  
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    (async () => {
      setName(await file.name.substr(1));
      
    })();
  }, [file]);

  useEffect(() => {
    (async () => {
      
      setValue(await file.text());
      
      console.log(value);
      
      var fs = require('browserify-fs');

      fs.readFile('/files/'+file.name, function(error,data) {
        //console.log();
        if(data) {
          if(data.length>0) {
            
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data))));
          
            console.log(editorState.getCurrentContent());
            const blocks = JSON.parse(data).blocks;
            console.log(blocks);
            console.log(blocks.length);
            var container = document.getElementsByClassName("public-DraftEditor-content");
            //console.log(container[0].firstChild.textContent);
            var str;
            for(var i =0; i < blocks.length; i++) {
              if(blocks[i].text== "") {
                str += "\n";
              }else {
                str += blocks[i].text + "\n";
              }

            }
            console.log(str);
            //console.log([0].text +JSON.parse(data).blocks[1].text  + JSON.parse(data).blocks[2].text);
            setValue(editorState);
          }else {
            console.log("empty");
            setValue(EditorState.createEmpty());
            setEditorState(EditorState.createEmpty());
            console.log(editorState.getCurrentContent().getFirstBlock());
          }

        }
      });
    })();
  }, [file]);

  useEffect(() => {
    (async () => {
      

      if(value) {
        console.log("value change");
        try{
          setEditorState(await EditorState.createWithContent(ContentState.createFromText(value)));
        }catch(err) {
          
        }
      }else {
        setValue(editorState);
        console.log(editorState.getCurrentContent().getFirstBlock());
      }
      
    })();
  }, [value]);


  useEffect(()=> {
      if(value) {
          onClick_save(editorState,file.name);
        
      }
      
    
  },[editorState.getCurrentContent()]);
  
  const handleTabKey = (e) => {
    if(e.keyCode === 9) {
      console.log("tab");
      var content = editorState.getCurrentContent();
      var selection = editorState.getSelection();
      console.log(selection);
      var newContent = Modifier.replaceText(content,selection, "    ");
      var newState = EditorState.push(editorState,newContent,'insert-characters');
      console.log(newState.getSelection());
      
      setEditorState(EditorState.moveSelectionToEnd(newState));
      
    }
  }


  return (
    <div className={css.editor}>
      <div className={css.title}>{name}</div>
      <div>
        <ToolBar editorState={editorState}  setEditorState={setEditorState} filename = {file.name}></ToolBar>
        
      </div>
      <Bar>
        <Editor customStyleMap={Map} editorState={editorState} onChange={setEditorState} onTab={handleTabKey} />
      </Bar>
 
    </div>
    
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
