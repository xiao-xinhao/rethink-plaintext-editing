import React, {useContext}from 'react';

import {ToolBarContainer, ToolBarItem} from './common';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';


const ToolBarButton = [
    
    {
        label: "save",
        icon: <FontAwesomeIcon icon = {faSave}/>
    }
];



export default function ToolBar(props) {
    

    const {name,text} = props;
    

    const  saveButtonClick = () => {
        console.log("hi");
        console.log(text);
        console.log(name);
        var fs = require('browserify-fs');
        fs.writeFile('/files/' + name, text,function() {
            console.log("saved");
            window.confirm("Saved.");
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