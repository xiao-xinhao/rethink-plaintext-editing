import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import path from 'path';
import classNames from 'classnames';

import { listFiles } from '../files';

// Used below, these need to be registered
import MarkdownEditor from '../components/MarkdownEditor';
import PlaintextEditor from '../components/PlaintextEditor';
import CodeEditor from '../components/CodeEditor';
import AddFile from '../components/AddFile';

import IconPlaintextSVG from '../public/icon-plaintext.svg';
import IconMarkdownSVG from '../public/icon-markdown.svg';
import IconJavaScriptSVG from '../public/icon-javascript.svg';
import IconJSONSVG from '../public/icon-json.svg';

import css from './style.module.css';
import { EditorState } from 'draft-js';
import Minimap from 'react-simple-minimap';
//import fs from 'fs';
//import BrowserFs from 'browserfs';

const TYPE_TO_ICON = {
  'text/plain': IconPlaintextSVG,
  'text/markdown': IconMarkdownSVG,
  'text/javascript': IconJavaScriptSVG,
  'application/json': IconJSONSVG
};


function FilesTable({ files, setFiles, activeFile, setActiveFile }) {

  const [remove, setRemove] = useState("0");

  useEffect(()=>{console.log(files)},[files]);

  return (
    <div className={css.files}>
      <table id = "FilesTable">
        <thead>
          <tr>
            <th>File</th>
            <th>Modified</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr 
              key={file.name}
              className={classNames(
                css.row,
                activeFile && activeFile.name === file.name ? css.active : ''
              )}
            >
              <td className={css.file} onClick={(e) => {
                document.getElementById("AddError").style.display = "none";
                document.getElementById("filenameExist").style.display = "none";
                document.getElementById("filenameError").style.display = "none";
                console.log(document.getElementById("FilesTable").lastChild.hasChildNodes(e.currentTarget));
                console.log(document.getElementById("FilesTable"));
                console.log(e.currentTarget);
                
                
                setActiveFile(file);
              }}>
                <div
                  className={css.icon}
                  dangerouslySetInnerHTML={{
                    __html: TYPE_TO_ICON[file.type]
                  }}
                ></div>
                {path.basename(file.name)}
              </td>

              <td onClick={(e) => {
                document.getElementById("AddError").style.display = "none";
                document.getElementById("filenameExist").style.display = "none";
                document.getElementById("filenameError").style.display = "none";
                console.log(document.getElementById("FilesTable").lastChild.hasChildNodes(e.currentTarget));
                console.log(document.getElementById("FilesTable"));
                console.log(e.currentTarget.lastChild.firstChild);
                
                setActiveFile(file);
                
              
              }}>
                {new Date(file.lastModifiedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </td>
              <td onClick= {(e)=>{
                 
                 document.getElementById("AddError").style.display = "none";
                 document.getElementById("filenameExist").style.display = "none";
                document.getElementById("filenameError").style.display = "none";
                 var table = document.getElementById("FilesTable");
                 console.log(table.childNodes[1]);
                 var filename = e.currentTarget.parentElement.firstChild.lastChild.textContent;
                 var response = window.confirm("Do you want to delete "+ filename + "?");
                 if(response == true) {
                  console.log(e.currentTarget.parentElement);
                  console.log(table.childNodes[1]);
                  //table.childNodes[1].removeChild(e.currentTarget.parentElement);
                  var fs = require('browserify-fs');
                  var fi = [];
                  fi = fi.concat(files);
                  fs.unlink('./files/' + filename, function(err,data){
                    for(var i = 0; i < fi.length; i++) {
                      if(files[i].name == "/" + filename) {
                        fi.splice(i,1);
                        console.log(fi);
                        break;
                      }
                    }
                    console.log(fi);
                    setFiles(fi);
                    
                  });
                  setActiveFile(null);
                  console.log("set2");
                }
               }} >
                <button className = {css.delete}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


FilesTable.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
  activeFile: PropTypes.object,
  setActiveFile: PropTypes.func,
  setFiles: PropTypes.func
};

function Previewer({ file }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  return (
    <div className={css.preview}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <div className={css.content}>{value}</div>
    </div>
  );
}

Previewer.propTypes = {
  file: PropTypes.object
};

// Uncomment keys to register editors for media types
const REGISTERED_EDITORS = {
  "text/plain": PlaintextEditor,
   "text/markdown": MarkdownEditor
};

function PlaintextFilesChallenge() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [fileText, setFileText] = useState("");
  const [add, setAdd] = useState(0);
  useEffect(() => { 
    /*
      --------------------------------
      These two lines show load the example files
      Comment it if you don't need.
    */
    
    //const f = listFiles();
    //setFiles(f);
    // console.log(files.length)
    /*
      --------------------------------
    */

    loadFiles(files);
    
  }, []);

  useEffect(()=>{
    console.log(files.length);
    
    loadFiles(files);
    
    
    //loadFiles(files);
  },[]);


  const vertifyExists = (file,files) => {
    console.log("hi");
    console.log(file);
    console.log(files);
    for(var i =0; i < files.length; i++) {
      console.log(file.name);
      if(files[i].name == file.name) {
        return true;
      }
    }
    return false;
  }
  const changeSingleDate = (file,files)=> {
    var fs = require("browserify-fs");
    var fi = [];
    fi = fi.concat(files);
    fs.stat('./files' + file.name, function(err,data){
      console.log("Modified");
      console.log(file.name);
      console.log(data);
      if(data) {
        var f;
        for(var i =0; i < files.length;i++) {
          if(files[i].name == file.name) {
            var lastModified = data.mtime.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            f = new File(
              [files[i].text()],
              files[i].name,
              {
                type: files[i].type,
                lastModifiedDate: lastModified

              });
              console.log(files[i].lastModifiedDate);
              console.log(f.lastModifiedDate);
            
            fi.splice(i,1);
            fi.push(f);
            
            break;
            
        }
      }
      console.log("set");
      console.log(f.lastModifiedDate);
      setFiles(fi);
      
    }

    });
  }
  const getModifiedDate = (files) => {
    console.log(files.length);
    for(var i = 0; i < files.length; i++) {
      
      changeSingleDate(files[i],files);
      
    }
    
  };

 const loadFiles = (files) => {
   console.log(files.length);
   console.log(document.getElementById("FilesTable"));
  var fs = require("browserify-fs");
  var fi = [];
  //var fi = fi.concat(files);
  fs.exists('/files',(exists) => {
    if(!exists) {
      fs.mkdir('/files',function(err,data){});
    }
  });


  fs.readdir ('/files',function(err, data) {
    console.log(data);
    if(data) {
    for(var i = 0; i < data.length; i++) {
      
      var filename = data[i].toString();
      
      //console.log(filename);
      var ext = filename.split('.');
      

      if(ext[ext.length-1].toLowerCase() == 'txt') {
        var f = new File(
          [""],
          '/' + filename,
          {
            type: 'text/plain',
            
          }
        );
        var ver = vertifyExists(f,fi);
         console.log(ver);
        if(!ver){
          console.log("push");
          fi.push(f);
         }
      }else if(ext[ext.length-1].toLowerCase() == 'md') {
        var f = new File(
          [""],
          '/' + filename,
          {
            type: 'text/markdown',
            
          }
        );
        var ver = vertifyExists(f,files);
         console.log(ver);
        if(!ver){
          console.log("push");
          fi.push(f);
         }
      }else if(ext[ext.length-1].toLowerCase() == 'js'){
        var f = new File(
          [""],
          '/' + filename,
          {
            type: 'text/javascript',
            
          }
        );
        var ver = vertifyExists(f,files);
         console.log(ver);
        if(!ver){
          console.log("push");
          fi.push(f);
         }
      }else if(ext[ext.length-1].toLowerCase() == 'json'){
        var f = new File(
          [""],
          '/' + filename,
          {
            type: 'application/json',
            
          }
        );
        var ver = vertifyExists(f,files);
         console.log(ver);
        if(!ver){
          console.log("push");
          fi.push(f);
         }
      }
      
        
      //console.log(fi.length);
      //files.push(fi);
      
      
    }
    console.log(fi);
    //fi  = files + fi;
    setFiles(fi);
    getModifiedDate(fi);
    //console.log(files);
  }
  
  });
  
 }

  const write = file => {
    console.log('Writing soon... ', file.name);
    var f = [];
    f = f.concat(files);
    // TODO: Write the file to the `files` array
    var fs = require("browserify-fs");
    fs.writeFile('./files' + file.name,"", function(err, data) {
      console.log(file.name);
      if(add == 0) {
        setAdd(1);
      }else {
        setAdd(0);
      }
      f.push(file);
      setFiles(f);
      //loadFiles(f);
    });
    
    //setFiles(f);
    var table = document.getElementById("FilesTable");
    //;
    console.log(f.length);
  };
  


  const Editor = activeFile ? REGISTERED_EDITORS[activeFile.type] : null;

  return (
    <div className={css.page}>
      <Head>
        <title>Rethink Engineering Challenge</title>
      </Head>
      <aside>
        <header>
          <div className={css.tagline}>Rethink Engineering Challenge</div>
          <h1>Fun With Plaintext</h1>
          <div className={css.description}>
            Let{"'"}s explore files in JavaScript. What could be more fun than
            rendering and editing plaintext? Not much, as it turns out.
          </div>
        </header>
        
        <AddFile write = {write}></AddFile>
        
        {/* <button name="Save" onClick={saveEvent}><h3>Save</h3></button> */}
        <FilesTable
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          setFiles = {setFiles}
        />

        <div style={{ flex: 1 }}></div>

        <footer>
          <div className={css.link}>
            <a href="https://v3.rethink.software/jobs">Rethink Software</a>
            &nbsp;—&nbsp;Frontend Engineering Challenge
          </div>
          <div className={css.link}>
            Questions? Feedback? Email us at jobs@rethink.software
          </div>
        </footer>
        
      </aside>

      <main className={css.editorWindow}>
        
        {activeFile && (
          <>
            {Editor && <Editor file={activeFile} write={write} />}
            {!Editor && <div>
              {/* <Minimap  of={<CodeEditor file={activeFile} write = {write}/>} width = {400} height={4000} ></Minimap>  */}
              <CodeEditor file={activeFile} write = {write}/>
              </div>}
          </>
        )}

        {!activeFile && (
          <div className={css.empty}>Select a file to view or edit</div>
        )}
      </main>
    </div>
  );
}

export default PlaintextFilesChallenge;
