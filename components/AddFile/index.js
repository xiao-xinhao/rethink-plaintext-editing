import React from "react";
import css from './style.css';

export default function AddFile(props) {


    const {write} =  props;
    const addFileHandler = () => {
      document.getElementById("filenameExist").style.display = "none";
      document.getElementById("filenameError").style.display = "none";
      document.getElementById("AddError").style.display = "none";
      var filename = "/" + document.getElementById("newFilename").value;
      console.log(filename);
      if(document.getElementById("newFilename").value == "") {
        document.getElementById("filenameError").style.display = "flex";
      }else {
        document.getElementById("newFilename").value = "";
        //check if file exists + correctness of file extension. 

        var fs = require("browserify-fs");

        fs.exists('./files' + filename, (exists) => {
            if(!exists) {
                console.log("not exists");
                var ext = filename.split('.');
                var f;
                if(ext[ext.length-1].toLowerCase() == 'txt') {
                  f = new File(
                    [""],
                    '' + filename,
                    {
                      type: 'text/plain',
                      
                    }
                  );
                  write(f);
                  document.getElementById("AddError").style.display = "flex";
                }else if(ext[ext.length-1].toLowerCase() == 'md') {
                  f = new File(
                    [""],
                    '' + filename,
                    {
                      type: 'text/markdown',
                      
                    }
                  );
                  write(f);
                  document.getElementById("AddError").style.display = "flex";
                }else if(ext[ext.length-1].toLowerCase() == 'js'){
                  f = new File(
                    [" "],
                    '' + filename,
                    {
                      type: 'text/javascript',
                      
                    }
                  );
                  write(f);
                  document.getElementById("AddError").style.display = "flex";
                }else if(ext[ext.length-1].toLowerCase() == 'json'){
                  f = new File(
                    [" "],
                    '' + filename,
                    {
                      type: 'application/json',
                      
                    }
                  );
                  write(f);
                  document.getElementById("AddError").style.display = "flex";
                }else{
                  document.getElementById("filenameError").style.display = "flex";
                }

                
                
            }else {
              document.getElementById("filenameExist").style.display = "flex";
            }

        });
      }
      

    };


    return (
        

        <div className= {css.AddNewFile}>
            <input id = "newFilename" type="text" placeholder="New filename.." onClick={()=>{
                document.getElementById("AddError").style.display = "none";
            }}></input>

            <button onClick={addFileHandler}><b>+</b></button>

            
            
            <label id="filenameError" className={css.filenameError} > * Enter a valid filename with <br/>one of the flowing extensions.<br/> (.txt, .md, .js, .json)</label>
            <label id = "filenameExist" className={css.filenameError}>* Filename Exists. </label>
            <label id="AddError" className={css.filenameAdded} > * File Added Successfully.</label>
        </div>
    )
}