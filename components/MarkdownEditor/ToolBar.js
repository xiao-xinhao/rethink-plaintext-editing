import React, {useContext}from 'react';

import {ToolBarContainer, ToolBarItem} from './common';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import EditorContext from './EditorContext';

const ToolBarButton = [
    
    {
        label: "save",
        icon: <FontAwesomeIcon icon = {faSave}/>
    }
];



export default function ToolBar(props) {
    

    const {filenmae} = props;
    const {originalText, name} = useContext(EditorContext);

    const  saveButtonClick = () => {
        console.log("hi");
        console.log(originalText);
        console.log(name);
        var fs = require('browserify-fs');
        fs.writeFile('/files/' + name, originalText,function() {
            console.log("saved");
            fs.readFile('/files/' + name, function(err, data) {
              console.log(data.toString());
              console.log("read");
              
            });
        });
        
        
    };
    
    return (
        <ToolBarContainer> 
            {ToolBarButton.map((item,idx) =>{
                return <ToolBarItem key = {`${item.label}-${idx}` }  onClick={() =>saveButtonClick()}>
                    {item.icon || item.label}
                </ToolBarItem>
            })}
        </ToolBarContainer>
    )


}