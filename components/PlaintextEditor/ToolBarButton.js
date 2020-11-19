import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBold, faItalic, faUnderline,faSave, faPlus,faMinus, faAlignCenter} from '@fortawesome/free-solid-svg-icons';


const ToolBarButton = [
    {
        label: "save",
        icon: <FontAwesomeIcon icon ={faSave}/>
    },
    {
        label: "bold",
        style: "BOLD",
        icon: <FontAwesomeIcon icon = {faBold}/>
    },
    {
        label: "italic",
        style: "ITALIC",
        icon: <FontAwesomeIcon icon = {faItalic}/>
    },
    {
        label: "underline",
        style: "UNDERLINE",
        icon: <FontAwesomeIcon icon = {faUnderline}/>
    }
    
   
    
];

const ColorButton = [
    {
        label: 'red',
        style: 'red'
    },
    {
        label: "orange",
        style: "orange"
    },
    {
        label: "yellow",
        style: "yellow"
    },
    {
        label: "green",
        style: "green"
    },
    {
        label: "blue",
        style: "blue"
    },
    {
        label: "indigo",
        style: "indigo"
    },
    {
        label: "violet",
        style: "violet"
    },
    {
        label: "black",
        style: "black"
    }

];
export {ToolBarButton,ColorButton};