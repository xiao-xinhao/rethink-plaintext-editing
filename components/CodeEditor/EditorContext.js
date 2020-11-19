import React from "react";


const defaultContext = {
    name: "",
    originalText: "",
    markdownText: "",
    setMarkDownText: ()=>{},
    setOriginalText: ()=>{}
    
};


export default React.createContext(defaultContext);