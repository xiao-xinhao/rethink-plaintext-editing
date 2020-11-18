import React, {useState, useEffect}from 'react';
import PropTypes from 'prop-types';

import css from './style.css';

import Editor from './Editor';
import Result from './Result';
import EditorContext from './EditorContext';
import ToolBar from './ToolBar';

function MarkdownEditor({ file, write }) {
  //console.log(file, write);
  const [value , setValue] = useState();
  const [name, setName] = useState();
  const [markdownText,setMarkDownText] = useState("");
  const [textValue,setTextValue] = useState("");
  const [originalText, setOriginalText] = useState("");

  useEffect(() => {
    (async () => {
      setName(await file.name.substr(1));
      
    })();
  }, [file]);

  useEffect(() => {
    (async () => {
      setValue(await file.text());
      var fs = require('browserify-fs');
      
      fs.readFile('/files/'+file.name, function(error,data) {
        if(data) {
          setValue(data.toString());
        }
      });
      
    })();
  }, [file]);

  useEffect(() => {
    (async () => {
      if(value) {
        
        setTextValue(await value);
      }else {
        setTextValue("");
      }

    })();
  }, [value]);

  useEffect(() => {
    (async () => {
      if(value) {
        setMarkDownText(await value);
      }else {
        setMarkDownText("");
      }

    })();
  }, [value]);

  useEffect(() => {
    (async () => {
      if(value) {
        setOriginalText(await value);
      }else {
        setOriginalText("");
      }

    })();
  }, [value]);


  useEffect(()=>{
    if(name) {
    var fs = require('browserify-fs');
    fs.writeFile('/files/' + name, originalText,function() {
       console.log(name);
        console.log("saved");
        
    });
    }
  },[originalText]);

  const contextValue = {
    name,
    originalText,
    markdownText,
    setMarkDownText,
    setOriginalText
  };


  return (
    <EditorContext.Provider value = {contextValue}>
      <div className={css.editor}>
      <div className={css.title}>{name}</div>
      <ToolBar></ToolBar>
      <div className = {css.Container}>
        <Editor textValue = {textValue} setTextValue = {setTextValue}></Editor>
        <Result></Result>
      </div>
      
    </div>
    </EditorContext.Provider>
    
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
