import React, {useState,useEffect}from 'react';
import css from './style.css';
import Editor from './Editor';
import Minimap from 'react-simple-minimap';

export default function CodeEditor({file,write}) {

    const [value , setValue] = useState();
    const [name, setName] = useState();

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
                if(data) {
                    setValue(data.toString());
                    console.log(data.toString());
                }
            });
            

            
            
        })();
    }, [file]);



    return (
        <div className = {css.editor}>
            <div className={css.title}>{name}</div>
            <div className = {css.Container}>
                
                <Editor textValue = {value} name = {name}></Editor>
            </div>

        </div>



    )

}