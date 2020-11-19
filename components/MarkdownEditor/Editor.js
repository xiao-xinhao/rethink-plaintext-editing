import React, { useContext } from "react";
import {Container, TextArea} from './common';
import EditorContext from "./EditorContext";
import EdictorContext from './EditorContext';



export default function Editor(props) {
    const {textValue, setTextValue}= props;
    const {setMarkDownText} =   useContext(EdictorContext);
    const {setOriginalText} = useContext(EditorContext);
    const onInputChange = e => {
        var newValue = e.currentTarget.value;
        if(newValue == "") {
            newValue = " ";
        }
        setMarkDownText(newValue);
        setTextValue(newValue);
        setOriginalText(newValue);
    }

    return (
        <Container>
            <TextArea value = {textValue} onChange={onInputChange}>
                
            </TextArea>
        </Container>
    );

}